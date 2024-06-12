import { Router } from "express";

export const userController = Router();

userController.get("/", (req, res) => {
  res.status(200).send(`hey there`);
});
