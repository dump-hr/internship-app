import express, { Request, Response } from "express";
import cors from "cors";
import fs from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { spawn, ChildProcessWithoutNullStreams } from "node:child_process";
import { languageConfig } from "./config";

const app = express();

app.use(cors());
app.use(express.json());

const processes = new Map<number, ChildProcessWithoutNullStreams>();

app.post("/run", async (req: Request, res: Response) => {
  const { language } = req.body;
  const code = req.body.code.trim();

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  const config = languageConfig.find((config) => config.language === language);

  if (!config) {
    return res.status(400).json({ error: "Invalid language" });
  }

  const file = `${await fs.mkdtemp(path.join(tmpdir(), "code-"))}/file`;
  await fs.writeFile(file, code);

  const [cmd, ...args] = config.command.replace("{file}", file).split(" ");
  const proc = spawn(cmd, args);
  const pid = proc.pid;

  if (!pid) {
    return res.status(500).json({ error: "Failed to spawn process" });
  }

  processes.set(pid, proc);

  proc.on("exit", () => {
    processes.delete(pid);
    fs.rm(path.dirname(file), { recursive: true, force: true });
  });

  return res.json({ pid });
});

app.get("/stdout/:pid", async (req: Request, res: Response) => {
  const pid = +req.params.pid;

  if (!processes.has(pid)) {
    return res.status(404).json({ error: "Process not found" });
  }

  const proc = processes.get(pid)!;

  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  res.write("retry: 10000\n\n");

  proc.stdout.on("data", (data) => {
    const message = { type: "stdout", data: data.toString() };
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  });

  proc.stderr.on("data", (data) => {
    const message = { type: "stderr", data: data.toString() };
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  });

  proc.on("exit", (code) => {
    const message = { type: "exit", data: `Process exited with code ${code}` };
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  });
});

app.post("/stdin/:pid", async (req: Request, res: Response) => {
  const { data } = req.body;
  const pid = +req.params.pid;

  if (!data) {
    return res.status(400).json({ error: "No data provided" });
  }

  if (!processes.has(pid)) {
    return res.status(404).json({ error: "Process not found" });
  }

  const proc = processes.get(pid)!;

  proc.stdin.write(data);

  return res.sendStatus(200);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Code runner service listening at http://localhost:${PORT}`);
});
