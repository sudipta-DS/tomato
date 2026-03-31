import log from "../utils/logger.js";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import tryCatch from "../middlewares/trycatch.js";

const TOKEN_EXPIRY = 1000 * 60 * 60 * 24 * 15;

const userLogin = tryCatch(async (req, res) => {
  const { name, email, picture } = req.body;
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

export { userLogin };
