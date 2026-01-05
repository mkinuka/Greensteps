import {
  saveFlight,
  fetchFlightsByDate,
  fetchAllFlights,
  deleteFlight,
} from "../controllers/flightController.mjs";
import { authenticateUser } from "../middelware/authentication.mjs";
import express from "express";
const router = express.Router();

router.post("/saveflight", authenticateUser, saveFlight);
router.get("/flightsbydate", authenticateUser, fetchFlightsByDate);
router.get("/allflights", authenticateUser, fetchAllFlights);
router.delete("/flights/:id", authenticateUser, deleteFlight);

export default router;
