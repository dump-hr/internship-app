import 'xterm/css/xterm.css';

import { Button } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';

import c from './CodeRunner.module.css';
import { messages } from './constants';

export const CodeRunner = () => {
  const terminal = useRef<Terminal | null>(null);

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

  return (
    <div className={c.wrapper}>
      <Button variant="contained">Run</Button>
      <div id="xterm"></div>
    </div>
  );
};
