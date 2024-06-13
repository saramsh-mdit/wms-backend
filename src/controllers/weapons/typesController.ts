import { Router } from "express";
import {
  add_weapon_type,
  delete_weapon_type,
  find_wtype_by_id,
  get_weapon_types,
  update_weapon_type,
} from "./typesServices";

// todo : add adminMiddleware
export const weaponTypeController = Router();

weaponTypeController.get("/weapon-types", async (req, res) => {
  try {
    const wtypes = await get_weapon_types();
    res.send(wtypes);
  } catch (err) {
    res.send(err);
  }
});

weaponTypeController.get("/weapon-types/:id", async (req, res) => {
  try {
    const wtype_id = req.params.id as string;
    const type = await find_wtype_by_id(wtype_id);
    res.send(type);
  } catch (err) {
    res.send(err);
  }
});

weaponTypeController.post("/weapon-types", async (req, res) => {
  try {
    const { name }: { name: string } = req.body;
    console.log(name);
    await add_weapon_type(name);
    res.send("new weapon type added");
  } catch (err) {
    res.send(err);
  }
});

weaponTypeController.patch("/weapon-types/:id", async (req, res) => {
  try {
    const wtype_id = req.params.id as string;
    const { name } = req.body;
    await update_weapon_type(wtype_id, name);
    res.send("weapon updated");
  } catch (err) {
    res.send(err);
  }
});

weaponTypeController.delete("/weapon-types/:id", async (req, res) => {
  try {
    const wtype_id = req.params.id as string;
    await delete_weapon_type(wtype_id);
    res.send("weapon type deleted");
  } catch (err) {
    res.send(err);
  }
});
