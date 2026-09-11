import express from "express";
import { login, logout, signup } from "../controller/user.controller.js";

const router = express.Router();

// /api/auth/signup
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
