import express from "express";
import { getUser, getDashboardStats } from "../controllers/general.mjs";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);
export default router;