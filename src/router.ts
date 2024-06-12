import { Router } from "express";
import { authController } from "./controllers/auth";

export const router = Router();

router.use(authController);
