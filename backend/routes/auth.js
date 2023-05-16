import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

/* Post request */
router.post("/login", login);

export default router;
