import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/run", (req: Request, res: Response) => {
  const { code, language } = req.body;
  console.log(code);
  console.log(language);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Code runner service listening at http://localhost:${PORT}`);
});
