import { Router } from "express";
import { userController } from "./controllers/users";

export const router = Router();

router.use(userController);
