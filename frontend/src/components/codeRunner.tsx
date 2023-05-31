import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

type Props = {
  getCode: () => string;
};

const CodeRunner: React.FC<Props> = ({ getCode }) => {
  const run = async () => {
    const code = getCode();
    if (!code) {
      alert("no code");
    }

    terminal.current?.clear();

    const response = await fetch("http://localhost:3000/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, language: "python" }),
    });
    const { pid } = await response.json();

    const stdout = new EventSource(`http://localhost:3000/stdout/${pid}`);

    stdout.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data);

      if (type === "exit") {
        const color = data.match(/code 0$/) ? "32" : "31";
        terminal.current?.write(`\x1B[${color}m${data}\x1B[0m\n`);
        stdout.close();
      }

      if (["stdout", "stderr"].includes(type)) {
        terminal.current?.write(data);
      }
    };

    const writer = terminal.current?.onData((key) => {
      if (stdout.readyState === EventSource.CLOSED) {
        terminal.current?.clear();
        writer?.dispose();
        return;
      }

      const data = key.charCodeAt(0) === 13 ? "\n" : key;
      terminal.current?.write(data);

      fetch(`http://localhost:3000/stdin/${pid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
    });
  };

  const terminal = useRef<Terminal | null>();

  useEffect(() => {
    terminal.current = new Terminal({ convertEol: true });

    const el = document.getElementById("xterm");
    if (el) {
      terminal.current.open(el);
    }

    return () => {
      terminal.current?.dispose();
      terminal.current = null;
    };
  }, []);

  return (
    <div>
      <button onClick={run}>Run</button>
      <div id="xterm"></div>
    </div>
  );
};

export default CodeRunner;
