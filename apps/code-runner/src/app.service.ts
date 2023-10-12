import { spawn } from 'node:child_process';
import EventEmitter from 'node:events';
import fs from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { fromEvent, map, merge } from 'rxjs';

import { config } from './config';
import { CodingLanguage } from './types';

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

  killProgram(pid: string) {
    if (!pid) {
      throw new BadRequestException('No pid provided');
    }

    const stream = this.getStream(pid);

    stream.emit('kill');

    return 'ok';
  }
}
