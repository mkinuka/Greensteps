import {
  uploadCar,
  fetchCars,
  saveJourney,
  fetchJourneysByDate,
  deleteCars,
  deleteJourney,
} from "../controllers/createCarscontroller.mjs";
import { authenticateUser } from "../middelware/authentication.mjs";
import express from "express";

const router = express.Router();

router.delete("/deletcars:id", authenticateUser, deleteCars);
router.post("/uploadcars", authenticateUser, uploadCar);
router.get("/fetchcars", authenticateUser, fetchCars);
router.post("/savejourney", authenticateUser, saveJourney);
router.get("/journeysbydate", authenticateUser, fetchJourneysByDate);
router.delete("/deletejourney:id", authenticateUser, deleteJourney);

export default router;
