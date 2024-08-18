import { spawn } from 'node:child_process';
import EventEmitter from 'node:events';
import fs from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { memoryUsage } from 'node:process';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import pidusage from 'pidusage';
import { fromEvent, interval, map, merge } from 'rxjs';

import { config } from './config';
import {
  CodingLanguage,
  CreateEvaluationRequest,
  EvaluateTestCaseResult,
  TestCaseResult,
} from './types';

@Injectable()
export class AppService {
  private streams = new Map<string, EventEmitter>();

  private getStream(pid: string) {
    if (!this.streams.has(pid)) {
      this.streams.set(pid, new EventEmitter());
    }
    return this.streams.get(pid);
  }

  async spawnProgram(pid: string, code: string, language: CodingLanguage) {
    if (!pid) {
      throw new BadRequestException('No pid provided');
    }

    if (!code.trim()) {
      throw new BadRequestException('No code provided');
    }

    if (!Object.values(CodingLanguage).includes(language)) {
      console.log(language);
      throw new BadRequestException('Coding language not supported');
    }

    const dir = path.join(tmpdir(), `code-runner-${pid}`);
    const file = `${dir}/file.${config[language].extension}`;
    await fs.mkdir(dir);
    await fs.writeFile(file, code);

    const cmd = config[language].command.replace('{file}', file);
    const proc = spawn('sh', ['-c', cmd], { cwd: dir });

    if (!proc.pid) {
      throw new InternalServerErrorException('Failed to spawn process');
    }

    const stream = this.getStream(pid);

    proc.stdout.on('data', (data) => {
      stream.emit('stdout', data);
    });
    proc.stderr.on('data', (data) => {
      stream.emit('stdout', data);
    });
    stream.on('stdin', (data) => {
      proc.stdin.write(data);
    });

    proc.on('exit', (code) => {
      stream.emit(
        'exit',
        code !== null ? `Process exited with code ${code}` : 'Process killed',
      );
      this.streams.delete(pid);
      fs.rm(dir, { recursive: true, force: true });
    });

    stream.on('kill', () => {
      proc.kill();
    });

    setTimeout(() => {
      proc.kill();
    }, 10 * 60 * 1000);

    return 'ok';
  }

  streamStdout(pid: string) {
    if (!pid) {
      throw new BadRequestException('No pid provided');
    }

    const stream = this.getStream(pid);

    return merge(
      fromEvent(stream, 'stdout').pipe(
        map((text) => ({ data: { text: text.toString(), event: 'stdout' } })),
      ),
      fromEvent(stream, 'exit').pipe(
        map((text) => ({ data: { text: text.toString(), event: 'exit' } })),
      ),
    );
  }

  getProcessMemoryUsage(pid: number) {
    return new Promise((resolve, reject) => {
      pidusage(pid, (err, stats) => {
        if (err) reject(err);
        else resolve(stats.memory);
      });
    });
  }

  sendStdin(pid: string, text: string) {
    if (!pid) {
      throw new BadRequestException('No pid provided');
    }

    if (!text) {
      throw new BadRequestException('No text provided');
    }

    const stream = this.getStream(pid);

    stream.emit('stdin', text);

    return 'ok';
  }

  async evaluateTestCases(evaluationParams: CreateEvaluationRequest) {
    try {
      if (!evaluationParams?.testCases?.length) {
        throw new BadRequestException('No test cases provided');
      }

      const results = await Promise.all(
        // Not sure if this messes with memory, will test later
        evaluationParams.testCases.map((_, index) =>
          this.evaluateTestCase(evaluationParams, index),
        ),
      );

      return results;
    } catch (e) {
      console.error(e);
      //console.log(evaluationParams);
      throw new InternalServerErrorException('Failed to evaluate test cases');
    }
  }

  async evaluateTestCase(
    evaluationParam: CreateEvaluationRequest,
    index: number,
  ): Promise<EvaluateTestCaseResult> {
    if (evaluationParam.testCases.length <= index) {
      throw new BadRequestException('No test case provided');
    }

    const testCase = evaluationParam.testCases[index];

    const { codingLanguage, maxExecutionTime, maxMemory } = evaluationParam;

    const randomPid = Math.floor(Math.random() * 100 + 1).toString(16);

    if (this.streams.has(randomPid)) {
      return this.evaluateTestCase(evaluationParam, index);
    }

    await this.spawnProgram(randomPid, evaluationParam.code, codingLanguage);

    const stream = this.getStream(randomPid);
    const startTime = process.hrtime();
    const startMemory = process.memoryUsage().heapUsed;

    // TODO: possibly refactor this to use a queue / make this function standalone
    testCase.input.forEach((input) => {
      stream.emit('stdin', input);
    });

    const output = [];
    stream.on('stdout', (data) => {
      output.push(data.toString());
    });

    return new Promise((resolve, reject) => {
      stream.on('exit', async (exitCode) => {
        // Get memory usage
        if (exitCode !== 'Process exited with code 0') {
          return reject(
            new InternalServerErrorException(
              'Process exited with non-zero exit code',
            ),
          );
        }

        const totalMemoryUsage = 100;
        const executionTime = process.hrtime(startTime)[1] / 1000000;

        if (totalMemoryUsage > maxMemory) {
          return resolve({
            testCaseId: testCase.id,
            userOutput: output.join('\n'),
            evaluationStatus: TestCaseResult.MemoryLimitExceeded,
            executionTime,
            memoryUsed: totalMemoryUsage,
          });
        }

        if (executionTime > maxExecutionTime) {
          return resolve({
            testCaseId: testCase.id,
            userOutput: output.join('\n'),
            evaluationStatus: TestCaseResult.TimeLimitExceeded,
            executionTime,
            memoryUsed: totalMemoryUsage,
          });
        } // TODO: see if this can also be extrapolated into a function

        const outputIsValid =
          output.join('\n').trim() === testCase.expectedOutput;

        return resolve({
          testCaseId: testCase.id,
          userOutput: output.join('\n'),
          evaluationStatus: outputIsValid
            ? TestCaseResult.Correct
            : TestCaseResult.WrongAnswer,
          executionTime,
          memoryUsed: totalMemoryUsage, // TODO: Check if this is an accurate representation of memory usage
        });
      });
    });
  }

  killProgram(pid: string) {
    if (!pid) {
      throw new BadRequestException('No pid provided');
    }

    const stream = this.getStream(pid);

    stream.emit('kill');

    return 'ok';
  }
}
