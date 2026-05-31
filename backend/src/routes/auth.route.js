import express from "express";
import { login, logout, signup, checkAuth, generateSignature, updateProfilePic } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/generate-signature", generateSignature)

router.put("/update-profile-pic", protectRoute, updateProfilePic);

router.get("/check-user", protectRoute, checkAuth);


export default router;