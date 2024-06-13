import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { find_admin_by_email } from "../controllers/auth/service";

// verifying if the token is valid or not, user side
export async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req
      .header("authorization" ?? "Authorization")
      ?.replace("Bearer ", "");
    if (!token) throw "please login first";
    // decrypting data from token
    const decoded: any = jsonwebtoken.verify(token, process.env.JWT_SECRETKEY!);
    if (!decoded) throw "please authenticate again";
    if (decoded.exp < Date.now() / 1000) throw "please authenticate again";
    const isadmin = await find_admin_by_email(decoded.email);
    if (isadmin.length == 0) throw "not allowed";
    next();
  } catch (error) {
    next(error);
  }
}
