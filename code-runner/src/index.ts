import fs from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { spawn } from "node:child_process";
import { EventEmitter } from "node:events";

import express, { Request, Response } from "express";
import cors from "cors";

import { languageConfig } from "./config";

const app = express();

app.use(cors());
app.use(express.json());

const streams = new Map<string, EventEmitter>();
const getStream = (uuid: string) => {
  if (!streams.has(uuid)) {
    streams.set(uuid, new EventEmitter());
  }
  return streams.get(uuid)!;
};

app.post("/run/:uuid", async (req: Request, res: Response) => {
  const { code, language } = req.body;
  const { uuid } = req.params;

  if (!uuid) {
    return res.status(400).json({ error: "No uuid provided" });
  }

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  const config = languageConfig.find((config) => config.language === language);

  if (!config) {
    return res.status(400).json({ error: "Invalid language" });
  }

  const dir = path.join(tmpdir(), `code-runner-${uuid}`);
  const file = `${dir}/file.${config.extension}`;
  await fs.mkdir(dir);
  await fs.writeFile(file, code);

  const [cmd, ...args] = config.command.replace("{file}", file).split(" ");
  const proc = spawn(cmd, args, { cwd: dir });

  if (!proc.pid) {
    return res.status(500).json({ error: "Failed to spawn process" });
  }

  const stream = getStream(uuid);

  proc.stdout.on("data", (data) => {
    stream.emit("stdout", data);
  });
  proc.stderr.on("data", (data) => {
    stream.emit("stdout", data);
  });
  stream.on("stdin", (data) => {
    proc.stdin.write(data);
  });

  proc.on("exit", (code) => {
    stream.emit("exit", `Process exited with code ${code}`);
    streams.delete(uuid);
    fs.rm(dir, { recursive: true, force: true });
  });

  return res.sendStatus(200);
});

app.get("/stdout/:uuid", async (req: Request, res: Response) => {
  const { uuid } = req.params;

  if (!uuid) {
    return res.status(400).json({ error: "No uuid provided" });
  }

  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  res.flushHeaders();
  res.write("retry: 10000\n\n");

  const stream = getStream(uuid);

  stream.on("stdout", (data) => {
    const message = { event: "stdout", data: data.toString() };
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  });

  stream.on("exit", (data) => {
    const message = { event: "exit", data: data.toString() };
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  });
});

app.post("/stdin/:uuid", async (req: Request, res: Response) => {
  const { data } = req.body;
  const { uuid } = req.params;

  if (!data) {
    return res.status(400).json({ error: "No data provided" });
  }

  if (!uuid) {
    return res.status(400).json({ error: "No uuid provided" });
  }

  const stream = getStream(uuid);

  stream.emit("stdin", data);

  return res.sendStatus(200);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Code runner service listening at http://localhost:${PORT}`);
});
