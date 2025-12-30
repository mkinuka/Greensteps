import {
  saveTrains,
  fetchTodayTrains,
} from "../controllers/trainController.mjs";
import { authenticateUser } from "../middelware/authentication.mjs";
import express from "express";
const router = express.Router();

router.post("/savetrains", authenticateUser, saveTrains);
router.get("/todaytrains", authenticateUser, fetchTodayTrains);

export default router;
