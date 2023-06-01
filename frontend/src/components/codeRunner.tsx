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

const terminalPlaceholder = `${COLORS.GRAY}Run program to see output${COLORS.RESET}\n`;
const procesExitedMessage = (code: number) => {
  const color = code > 0 ? COLORS.RED : COLORS.GREEN;
  return `${color}Process exited with code ${code}${COLORS.RESET}\n`;
};

const CodeRunner: React.FC<Props> = ({ getCode }) => {
  const [pid, setPid] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const run = async () => {
    const code = getCode();
    if (!code) {
      alert("no code");
    }

    terminal.current?.reset();

    const response = await fetch("http://localhost:3000/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, language: "python" }),
    });
    const { pid } = await response.json();

    setPid(pid);

    const stdout = new EventSource(`http://localhost:3000/stdout/${pid}`);
    stdout.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data);

      if (type === "exit") {
        setStatusCode(+data);
        terminal.current?.write(procesExitedMessage(+data));
        stdout.close();
        setPid(null);
      }

      if (["stdout", "stderr"].includes(type)) {
        terminal.current?.write(data);
      }
    };
  };

  const terminal = useRef<Terminal | null>(null);

  useEffect(() => {
    terminal.current = new Terminal({ convertEol: true });
    terminal.current.write(terminalPlaceholder);

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
      if (statusCode !== null && pid === null) {
        console.log({ statusCode, key, pid });
        terminal.current?.reset();
        terminal.current?.write(terminalPlaceholder);
        setStatusCode(null);
        return;
      }

      if (pid === null) {
        return;
      }

      const data = key.charCodeAt(0) === 13 ? "\n" : key;
      terminal.current?.write(data);

      fetch(`http://localhost:3000/stdin/${pid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
    });

    return () => {
      writer?.dispose();
    };
  }, [pid, statusCode]);

  return (
    <div>
      <button onClick={run} disabled={pid !== null}>
        Run
      </button>
      <div id="xterm"></div>
    </div>
  );
};

export default CodeRunner;
