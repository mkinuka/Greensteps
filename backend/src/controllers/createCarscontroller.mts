import { Mycar } from "../models/createCar.mjs";
import { CarJourney } from "../models/carJourney.mjs";
import type { Request, Response } from "express";
import mongoose from "mongoose";



export const uploadCar = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ error: "user not authenticated." })
        }
        const { name, fuelType, fuelConsumption } = req.body;
        
        if (!name || !fuelType || fuelConsumption === undefined) {
            return res.status(400).json({ error: "Missing required fields: name, fuelType, and fuelConsumption" })
        }

        const entry = new Mycar({
            userId,
            name,
            fuelType,
            fuelConsumption,
        });

        const saved = await entry.save();
        res.status(201).json(saved)

    } catch (error) {
        console.error('Error saving car:', error);
        res.status(500).json({ message: "Failed to save entry" });
    }

}

export const fetchCars = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ error: "user not authenticated." })
        }

        const cars = await Mycar.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(cars);

    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ message: "Failed to fetch cars" });
    }
}

export const saveJourney = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ error: "user not authenticated." })
        }
        const { carId, distance, emissions, date } = req.body;
        
        if (!carId || !distance || emissions === undefined || !date) {
            return res.status(400).json({ error: "Missing required fields" })
        }

        const journey = new CarJourney({
            userId,
            carId,
            distance,
            emissions,
            date,
        });

        const saved = await journey.save();
        res.status(201).json(saved);

    } catch (error) {
        console.error('Error saving journey:', error);
        res.status(500).json({ message: "Failed to save journey" });
    }
}

export const fetchTodayJourneys = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ error: "user not authenticated." })
        }

        const today = new Date().toISOString().split('T')[0] as string;
        const journeys = await CarJourney.find({ 
            userId: new mongoose.Types.ObjectId(userId), 
            date: today 
        }).populate('carId');
        res.status(200).json(journeys);

    } catch (error) {
        console.error('Error fetching journeys:', error);
        res.status(500).json({ message: "Failed to fetch journeys" });
    }
}