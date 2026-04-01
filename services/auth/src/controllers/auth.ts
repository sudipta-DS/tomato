import log from "../utils/logger.js";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import tryCatch from "../middlewares/trycatch.js";
import { AuthenticatedRequest } from "../interfaces/user.js";
import { oauth2client } from "../config/googleConfig.js";
import axios from "axios";

const TOKEN_EXPIRY = 1000 * 60 * 60 * 24 * 15;

const userLogin = tryCatch(async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({
      message: "Authorization code is required",
    });
  }
  const googleRes = await oauth2client.getToken(code);
  oauth2client.setCredentials(googleRes.tokens);

  const userRes = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`,
  );

  const { name, email, picture } = userRes.data;
  let user = await User.findOne({ email });

  if (!user) {
    log.warn(`User not present with name ${name}. Creating user...`);
    user = await User.create({ name, email, image: picture });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: TOKEN_EXPIRY,
  });

  res.json({ message: "user loggedin successfully", token, user });
});

const allowedRoles = ["customer", "seller", "rider"];
type Role = (typeof allowedRoles)[number];

const addUserRole = tryCatch(async (req: AuthenticatedRequest, res) => {
  if (!req.user?._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { role } = req.body as { role: Role };

  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { role },
    { new: true },
  );

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const token = jwt.sign({ user }, process.env.JWT_SEC as string, {
    expiresIn: TOKEN_EXPIRY,
  });

  res.json({ message: "role added.", token, user });
});

const getMyProfile = tryCatch(async (req: AuthenticatedRequest, res) => {
  const { email } = req.body;
  const myProfile = await User.findOne({ email });
  if (!myProfile) {
    res.status(400).json({ message: "profile not found." });
  }
  res.json({ message: "profile fetched successfully.", user: myProfile });
});

export { userLogin, addUserRole, getMyProfile };
