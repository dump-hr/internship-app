import { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

type Props = {
  getCode: () => string;
};

const COLORS = {
  RESET: "\x1B[0m",
  RED: "\x1B[31m",
  GREEN: "\x1B[32m",
  GRAY: "\x1B[37m",
};

const messages = {
  processExited: (data: string) => {
    const color = data.match(/code 0$/) ? COLORS.GREEN : COLORS.RED;
    return `${color}${data}${COLORS.RESET}\n`;
  },
  placeholder: `${COLORS.GRAY}Run program to see output${COLORS.RESET}\n`,
};

enum ProcessState {
  Running,
  Exited,
}

const uuid = crypto.randomUUID(); // TODO use user id or smth

const CodeRunner: React.FC<Props> = ({ getCode }) => {
  const [process, setProcess] = useState<ProcessState | null>(null);

  const run = async () => {
    const code = getCode();
    if (!code) {
      alert("no code");
    }

    terminal.current?.reset();

    const stdout = new EventSource(`http://localhost:3000/stdout/${uuid}`);
    stdout.onmessage = (e) => {
      const { event, data } = JSON.parse(e.data);

      if (!["stdout", "stderr", "exit"].includes(event)) {
        console.error("Unknown stream event", event);
        return;
      }

      if (event === "exit") {
        setProcess(ProcessState.Exited);
        terminal.current?.write(messages.processExited(data));
        stdout.close();
        return;
      }

      terminal.current?.write(data);
    };

    await fetch(`http://localhost:3000/run/${uuid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language: "python" }),
    });

    setProcess(ProcessState.Running);
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
      <button onClick={run} disabled={process === ProcessState.Running}>
        Run
      </button>
      <div id="xterm"></div>
    </div>
  );
};

export default CodeRunner;
