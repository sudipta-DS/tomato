import express from "express";
import { addUserRole, getMyProfile, userLogin } from "../controllers/auth.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/add/role", isAuth, addUserRole);
router.get("/profile/me", isAuth, getMyProfile);

export default router;
