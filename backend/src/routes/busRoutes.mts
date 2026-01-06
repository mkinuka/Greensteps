import express from "express";
import {
  saveBus,
  deleteBus,
  fetchBusesByDate,
} from "../controllers/buscontrollers.mjs";
import { authenticateUser } from "../middelware/authentication.mjs";

const router = express.Router();

router.post("/savebus", authenticateUser, saveBus);
router.get("/busesbydate", authenticateUser, fetchBusesByDate);
router.delete("/buses/:id", authenticateUser, deleteBus);

export default router;
