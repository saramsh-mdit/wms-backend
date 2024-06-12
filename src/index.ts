import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { getDB } from "./db/database";
import { router } from "./router";

getDB()
  .then(() => {
    console.log(`database connected`);
  })
  .catch((err) => {
    if (err instanceof Error) console.log(err.message);
    else console.log(err);
  });

const app = express();

app.listen(process.env.PORT ?? 4000, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

app.use(express.json());

app.use(router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // console.error(err.stack);
  // console.log(err.message);
  res.status(500).send("Something went wrong!");
});
