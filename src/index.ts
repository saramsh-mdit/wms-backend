import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import path from "path";
import { router } from "./router";

const app = express();

app.listen(process.env.PORT ?? 4000, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const imgPath = path.join(process.cwd(), "images");
console.log(imgPath);
app.use(express.static(imgPath));

app.use(router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof JsonWebTokenError) {
    res.status(400).send(err.message);
  } else {
    res.status(500).send(err.length > 30 ? "Something went wrong" : err);
  }
});
