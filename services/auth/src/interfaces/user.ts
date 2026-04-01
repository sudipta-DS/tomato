import { Document, Schema } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}
