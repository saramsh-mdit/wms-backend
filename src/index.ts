import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { router } from "./router";

const app = express();

app.listen(process.env.PORT ?? 4000, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

app.use(express.json());

app.use(router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof JsonWebTokenError) {
    res.status(400).send(err.message);
  } else {
    res.status(500).send(err.length > 30 ? "Something went wrong" : err);
  }
});
