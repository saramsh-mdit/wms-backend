import { Router } from "express";
import { authController } from "./controllers/auth";
import { inventoryController } from "./controllers/inventory/inventory";
import { weaponTypeController } from "./controllers/weapons/typesController";
import { weaponController } from "./controllers/weapons/weaponController";

export const router = Router();

router.use(authController);
router.use(weaponController);
router.use(weaponTypeController);
router.use(inventoryController);
