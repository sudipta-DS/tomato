import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../interfaces/user.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import log from "../utils/logger.js";

const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Please login - No auth header",
      });
      return;
    }
    const token = authHeader.split(" ")[1] as string;
    const decodedValue = jwt.verify(
      token,
      process.env.JWT_SEC as string,
    ) as JwtPayload;

    if (!decodedValue || !decodedValue.user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    req.user = decodedValue.user;
    next();
  } catch (error: any) {
    log.error("Authetication request failed : " + error.stack);
  }
};

export default isAuth;
