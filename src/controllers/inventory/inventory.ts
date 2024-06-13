import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { buy_weapon, user_inventory } from "./iservice";

export const inventoryController = Router();

inventoryController.get("/items", authMiddleware, async (req, res) => {
  try {
    const user_id = res.locals.user_id;
    const items = await user_inventory(user_id);
    res.send({ message: items });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

inventoryController.post("/buy/:id", authMiddleware, async (req, res) => {
  try {
    const weapon_id = req.params.id;
    const user_id = res.locals.user_id;
    const quantity = parseInt(req.query.quantity!.toString());
    await buy_weapon(weapon_id, user_id, quantity);
    res.send({ message: "item purchased" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});
