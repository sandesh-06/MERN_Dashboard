import express from "express";
import { getSales } from "../controllers/sales.mjs";

const router = express.Router();

router.get("/sales", getSales);

export default router;