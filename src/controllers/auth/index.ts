import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { verify_password } from "../../utils/password_hashing";
import {
  admin_register,
  find_admin_by_email,
  find_user_by_email,
  find_user_by_id,
  user_delete,
  user_register,
} from "./service";

export const authController = Router();

authController.post("/users/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await user_register(name, email, password);
    res.send({ message: "user registered" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

authController.post("/users/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user_query = await find_user_by_email(email);
    if (user_query.length == 0) throw "no user found";
    // match hashed password with plain password, return if incorrect
    if (!(await verify_password(user_query[0].password, password)))
      throw "invalid password";
    const token = jsonwebtoken.sign(
      {
        data: user_query[0].user_id,
      },
      process.env.JWT_SECRETKEY! ?? "bdhsfj&6663!@sd",
      { expiresIn: "24h" }
    );
    res.cookie("cookie", token);
    res.send({ token, msg: "login successful" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// delete user account
authController.delete("/users/delete", authMiddleware, async (req, res) => {
  try {
    const user_id = res.locals.user_id;
    await user_delete(user_id);
    res.send({ message: "account deleted" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

authController.post("/admin/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await admin_register(name, email, password);
    res.send({ message: "admin registered" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

authController.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // get admin by querying admin id
    const admin_query = await find_admin_by_email(email);
    if (admin_query.length == 0) throw "no user found";
    // match hashed password with plain password, return if incorrect
    if (!(await verify_password(admin_query[0].password, password)))
      throw "invalid password";
    const token = jsonwebtoken.sign(
      {
        id: admin_query[0].admin_id,
        email: admin_query[0].email,
      },
      process.env.JWT_SECRETKEY! ?? "bdhsfj&6663!@sd",
      { expiresIn: "24h" }
    );
    res.cookie("cookie", token);
    res.send({ token, msg: "login successful", isAdmin: true });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

authController.get("/user", authMiddleware, async (_, res) => {
  try {
    const user_id = res.locals.user_id;
    const user = await find_user_by_id(user_id);
    if (user.length)
      return res.send({
        isAdmin: false,
        email: user[0].email,
        name: user[0].name,
      });
    return res.send({});
  } catch (err) {
    res.status(400).send({ message: err });
  }
});
