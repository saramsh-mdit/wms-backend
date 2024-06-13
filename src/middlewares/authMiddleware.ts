import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

// verifying if the token is valid or not, user side
export async function authMiddleware(
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
    res.locals.user_id = decoded.id;
    res.locals.isAdmin = decoded.isAdmin;
    next();
  } catch (error) {
    next(error);
  }
}
