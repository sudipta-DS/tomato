import { Request, Response, RequestHandler, NextFunction } from "express";
import log from "../utils/logger.js";

const tryCatch = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      log.error("User Login failed : " + error.stack);
      res.status(500).json({ message: error.message });
    }
  };
};

export default tryCatch;
