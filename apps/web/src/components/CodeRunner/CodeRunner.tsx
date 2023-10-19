import 'xterm/css/xterm.css';

import { CodingLanguage } from '@internship-app/types';
import { Box, Button } from '@mui/material';
import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';

import { runApi } from '../../api';
import c from './CodeRunner.module.css';
import { COLORS, keyMapper, messages } from './constants';
import { ProcessState } from './types';

type Props = {
  code: string;
  language: CodingLanguage;
};

export const CodeRunner: React.FC<Props> = ({ code, language }) => {
  const [process, setProcess] = useState<ProcessState | null>(null);
  const [pid, setPid] = useState<string | null>(null);

  const terminal = useRef<Terminal | null>(null);

  const resetTerminal = () => {
    terminal.current?.reset();
    terminal.current?.write(messages.placeholder);

    if (pid !== null) {
      runApi.delete(pid);
    }

    setProcess(null);
    setPid(null);
  };

  useEffect(() => {
    terminal.current = new Terminal({ convertEol: true });
    terminal.current.write(messages.placeholder);

    const el = document.getElementById('xterm');
    if (el) {
      terminal.current.open(el);
    }

    return () => {
      terminal.current?.dispose();
      terminal.current = null;
    };
  }, []);

  useEffect(() => {
    const writer = terminal.current?.onData((key) => {
      if (process === null || pid === null) {
        return;
      }

      if (process === ProcessState.Exited) {
        resetTerminal();
        return;
      }

      const text = keyMapper.get(key.charCodeAt(0)) ?? key;
      terminal.current?.write(text);

      runApi.put(pid, { text });
    });

    return () => {
      writer?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [process]);

  const remoteRun = async () => {
    terminal.current?.reset();

    const pid = nanoid();

    const stdout = new EventSource(`https://code-runner.bdeak.net/run/${pid}`);

    stdout.onmessage = ({ data }) => {
      const { event, text } = JSON.parse(data);

      switch (event) {
        case 'stdout':
          terminal.current?.write(text);
          break;

        case 'exit':
          setProcess(ProcessState.Exited);
          setPid(null);
          terminal.current?.write(messages.processExited(text));
          stdout.close();
          break;

        default:
          console.error('Unknown stream event', event);
      }
    };

    await runApi.post(pid, { code, language });

    setProcess(ProcessState.Running);
    setPid(pid);
    terminal.current?.focus();
  };

  const localRun = () => {
    terminal.current?.reset();

    const log = console.log;
    console.log = (...data) => {
      terminal.current?.writeln(data.join(' '));
    };

    (() => {
      try {
        setProcess(ProcessState.Running);
        eval(code);
        terminal.current?.write(messages.processExited('Process exited', true));
      } catch (err) {
        terminal.current?.writeln(`${COLORS.RED}${err}${COLORS.RESET}`);
      }
    })();

    console.log = log;
    setProcess(ProcessState.Exited);
  };

  const run = language === CodingLanguage.JavaScript ? localRun : remoteRun;

  return (
    <div className={c.wrapper}>
      <Box display="flex" gap="8px">
        <Button
          variant="contained"
          onClick={run}
          disabled={process === ProcessState.Running || !code.trim()}
        >
          Run
        </Button>
        <Button variant="text" onClick={resetTerminal}>
          Reset
        </Button>
      </Box>
      <div id="xterm"></div>
    </div>
  );
};
