import express from "express";
import {
  getMealsByDate,
  deleteMeal,
  uploadMeal,
} from "../controllers/foodController.mjs";
import { authenticateUser } from "../middelware/authentication.mjs";

const router = express.Router();

router.get("/mealsbydate", authenticateUser, getMealsByDate);
router.delete("/deletemeals/:id", authenticateUser, deleteMeal);
router.post("/uploadmeals", authenticateUser, uploadMeal);

export default router;
