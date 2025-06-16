import express from "express";
import {
  login,
  logout,
  signup,
  checkAuth,
} from "../controllers/authController.js";
import protectRoute from "../middleware/protectRoute.js";
import checkDatabase from "../middleware/checkDatabase.js";

const router = express.Router();

router.post("/signup", checkDatabase, signup);

router.post("/login", checkDatabase, login);

router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

export default router;
