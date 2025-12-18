import express from "express"
import { getTodaysMeals, deleteMeal, uploadMeal } from "../controllers/foodController.mjs";
import { authenticateUser } from "../middelware/authentication.mjs";

const router = express.Router();

router.get('/todaysmeals',authenticateUser, getTodaysMeals);
router.delete('/deletemeals',authenticateUser, deleteMeal);
router.post('/uploadmeals', authenticateUser, uploadMeal)

export default router;