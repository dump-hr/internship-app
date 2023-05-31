type Props = {
  getCode: () => string;
};

const CodeRunner: React.FC<Props> = ({ getCode }) => {
  const run = async () => {
    const code = getCode();
    if (!code) {
      alert("no code");
    }

    const response = await fetch("http://localhost:3000/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, language: "python" }),
    });
    const { pid } = await response.json();

    console.log("pid", pid);

    const stdout = new EventSource(`http://localhost:3000/stdout/${pid}`);

    stdout.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data);

      if (type === "exit") {
        console.log("exit", data);
        stdout.close();
      }

      if (["stdout", "stderr"].includes(type)) {
        console.log(type, data);
      }
    };
  };

  return (
    <div>
      <button onClick={run}>Run</button>
      <div>output</div>
    </div>
  );
};

export default CodeRunner;
