import type { Request, Response } from "express"
import { Meal } from "../models/meals.mjs"
import mongoose from "mongoose"

//function for getting todays meals from database
export const getTodaysMeals = async (req:Request, res:Response) => {
    try {
        const userId = req.user?.id;
        if(!userId) {
            return res.status(400).json({error:"user not authenticated."})
        }

        const today = new Date().toISOString().split('T')[0]!;

        const meals = await Meal.find({
            userId: new mongoose.Types.ObjectId(userId),
            date: today
        }).sort({createdAt: -1})

        const totalEmissions = meals.reduce((sum, meal) => sum + meal.emissions, 0);

    res.status(200).json({meals, totalEmissions, date: today})
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch meals' });
    }
}

// function for deleting meals from database
export const deleteMeal = () => {

}

// function for uploading meals to database
export const uploadMeal = async (req:Request, res:Response) => {
    try {
        const userId = req.user?.id;
        if(!userId) {
            return res.status(400).json({error:"user not authenticated."})
        }
        const {mealType, foodName, quantity, emissions, date} = req.body
        
        if(!mealType || !foodName || !quantity || !emissions || !date) {
            return res.status(400).json({error: "Missing required fields"})
        }

        const entry = new Meal ({
            userId,
            mealType,
            foodName,
            quantity,
            emissions,
            date,
        })

        const saved = await entry.save();
        res.status(201).json(saved)

    } catch (error) {
        console.error('Error saving meal:', error);
        res.status(500).json({ message: "Failed to save entry" });
    }

}