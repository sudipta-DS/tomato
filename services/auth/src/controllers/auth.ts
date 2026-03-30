import { Request, Response } from "express";

const userLogin = async (req: Request, res: Response) => {
  res.json(req.body);
};

export { userLogin };
