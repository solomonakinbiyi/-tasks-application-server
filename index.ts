import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const app: Express = express();
dotenv.config();

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TS server");
});

app.listen(port);
