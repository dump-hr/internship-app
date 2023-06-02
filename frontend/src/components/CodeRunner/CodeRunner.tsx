import { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

import { ProcessState } from "./types";
import { COLORS } from "./constants";

type Props = {
  code: string;
  language: string;
};

const uuid = crypto.randomUUID(); // TODO use user id or smth

export const CodeRunner: React.FC<Props> = ({ code, language }) => {
  const [process, setProcess] = useState<ProcessState | null>(null);

  const run = async () => {
    terminal.current?.reset();
    const stdout = new EventSource(`http://localhost:3000/stdout/${uuid}`);
    stdout.onmessage = (e) => {
      const { event, data } = JSON.parse(e.data);

      switch (event) {
        case "stdout":
          terminal.current?.write(data);
          break;

        case "exit":
          setProcess(ProcessState.Exited);
          terminal.current?.write(messages.processExited(data));
          stdout.close();
          break;

        default:
          console.error("Unknown stream event", event);
      }
    };

    await fetch(`http://localhost:3000/run/${uuid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language }),
    });

    setProcess(ProcessState.Running);
    terminal.current?.focus();
  };

  const terminal = useRef<Terminal | null>(null);

  useEffect(() => {
    terminal.current = new Terminal({ convertEol: true });
    terminal.current.write(messages.placeholder);

    const el = document.getElementById("xterm");
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
      if (process === null) {
        return;
      }

      if (process === ProcessState.Exited) {
        terminal.current?.reset();
        terminal.current?.write(messages.placeholder);
        setProcess(null);
        return;
      }

      const data = key.charCodeAt(0) === 13 ? "\n" : key;
      terminal.current?.write(data);

      fetch(`http://localhost:3000/stdin/${uuid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
    });

    return () => {
      writer?.dispose();
    };
  }, [process]);

  return (
    <div>
      <button
        onClick={run}
        disabled={process === ProcessState.Running || !code.trim()}
      >
        Run
      </button>
      <div id="xterm"></div>
    </div>
  );
};

const messages = {
  processExited: (data: string) => {
    const color = data.match(/code 0$/) ? COLORS.GREEN : COLORS.RED;
    return `\n${color}${data}${COLORS.RESET}\n`;
  },
  placeholder: `${COLORS.GRAY}Run program to see output${COLORS.RESET}\n`,
};
