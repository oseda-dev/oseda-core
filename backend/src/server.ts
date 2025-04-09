import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";

const app = express();
const port = 3001;

app.use(cors());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  const data = { message: "root response from backend" };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
