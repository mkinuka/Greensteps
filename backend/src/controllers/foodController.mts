import type { Request, Response } from "express";
import { Meal } from "../models/meals.mjs";
import mongoose from "mongoose";

//function for getting meals from database by date
export const getMealsByDate = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "user not authenticated." });
    }

    const { date } = req.query;
    let targetDate: string;

    if (typeof date === "string" && date.trim().length > 0) {
      targetDate = date.trim();
    } else {
      targetDate = new Date().toISOString().split("T")[0]!;
    }

    // Validera att datumet har rätt format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(targetDate)) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD" });
    }

    const meals = await Meal.find({
      userId: new mongoose.Types.ObjectId(userId),
      date: targetDate,
    }).sort({ createdAt: -1 });

    const totalEmissions = meals.reduce((sum, meal) => sum + meal.emissions, 0);

    res.status(200).json({ meals, totalEmissions, date: targetDate });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meals" });
  }
};

// function for uploading meals to database
export const uploadMeal = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "user not authenticated." });
    }
    const { mealType, foodName, quantity, emissions, date } = req.body;

    if (!mealType || !foodName || !quantity || !emissions || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const entry = new Meal({
      userId,
      mealType,
      foodName,
      quantity,
      emissions,
      date,
    });

    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error saving meal:", error);
    res.status(500).json({ message: "Failed to save entry" });
  }
};

//function for deleting meals from database
export const deleteMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }
    const deletedMeal = await Meal.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    if (!deletedMeal) {
      res.status(404).json({ error: "Meal not found" });
    }

    res.status(200).json({ message: "Successfully deleted meal", deletedMeal });
  } catch (error) {
    console.error("error deleting meal", error);
    res.status(500).json({ error: "failed to delete meal" });
  }
};
