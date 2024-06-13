import { Router } from "express";
import multer from "multer";

import {
  add_weapon,
  delete_weapon,
  find_weapon_by_id,
  get_weapons,
  update_weapon,
} from "./weaponService";

const upload = multer({ dest: "images/" });

export const weaponController = Router();

weaponController.get("/weapons", async (req, res) => {
  try {
    const weapons = await get_weapons();
    res.send(weapons);
  } catch (err) {
    res.send(err);
  }
});

weaponController.get("/weapons/:id", async (req, res) => {
  try {
    const weapon_id = req.query.id as string;
    const weapon = await find_weapon_by_id(weapon_id);
    res.send(weapon);
  } catch (err) {
    res.send(err);
  }
});

weaponController.post("/weapons", upload.single("image"), async (req, res) => {
  try {
    const image = req.file?.filename as string;
    const {
      name,
      quantity,
      description,
      weapon_type_id,
    }: {
      name: string;
      quantity: string;
      description: string;
      weapon_type_id: string;
    } = req.body;
    const weapon_data = {
      name,
      image,
      quantity: parseInt(quantity),
      description,
      weapon_type_id,
    };
    await add_weapon(weapon_data);
    res.send("weapon added");
  } catch (err) {
    res.send(err);
  }
});

weaponController.delete("/weapons/:id", async (req, res) => {
  try {
    const weapon_id = req.query.id as string;
    await delete_weapon(weapon_id);
    res.send("weapon deleted");
  } catch (err) {
    res.send(err);
  }
});

weaponController.patch(
  "/weapons/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const weapon_id = req.query.id as string;
      let image: any;
      if (req.file?.filename) {
        image = req.file?.filename as string;
      }
      const {
        name,
        quantity,
        maintainable,
      }: {
        name: string;
        quantity: number;
        maintainable: boolean;
      } = req.body;
      const weapon = { name, quantity, image, maintainable };
      await update_weapon(weapon_id, weapon);
      res.send("weapon updated");
    } catch (err) {
      res.send(err);
    }
  }
);
