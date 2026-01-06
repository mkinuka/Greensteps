import {
  saveTrains,
  fetchTodayTrains,
  fetchTrainsByDate,
  deleteTrain,
} from "../controllers/trainController.mjs";
import { authenticateUser } from "../middelware/authentication.mjs";
import express from "express";
const router = express.Router();

router.post("/savetrains", authenticateUser, saveTrains);
router.get("/todaytrains", authenticateUser, fetchTodayTrains);
router.get("/trainsbydate", authenticateUser, fetchTrainsByDate);
router.delete("/trains/:id", authenticateUser, deleteTrain);

export default router;
