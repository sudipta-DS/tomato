import mongoose from "mongoose";
import { Schema } from "mongoose";
import { IUser } from "../interfaces/user.js";

const schema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>("User", schema);

export default User;
