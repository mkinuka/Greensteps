import { Mycar } from "../models/createCar.mjs";
import { CarJourney } from "../models/carJourney.mjs";
import type { Request, Response } from "express";
import mongoose from "mongoose";

export const uploadCar = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "user not authenticated." });
    }
    const { name, fuelType, fuelConsumption } = req.body;

    if (!name || !fuelType || fuelConsumption === undefined) {
      return res.status(400).json({
        error: "Missing required fields: name, fuelType, and fuelConsumption",
      });
    }

    const entry = new Mycar({
      userId,
      name,
      fuelType,
      fuelConsumption,
    });

    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error saving car:", error);
    res.status(500).json({ message: "Failed to save entry" });
  }
};

export const fetchCars = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "user not authenticated." });
    }

    const cars = await Mycar.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Failed to fetch cars" });
  }
};

export const saveJourney = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "user not authenticated." });
    }
    const { carId, distance, emissions, date } = req.body;

    if (!carId || !distance || emissions === undefined || !date) {
      return res.status(400).json({ error: "Missing required fields" });
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
    console.error("Error saving journey:", error);
    res.status(500).json({ message: "Failed to save journey" });
  }
};

// Ny endpoint som tar emot datum som query parameter
export const fetchJourneysByDate = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "user not authenticated." });
    }

    // Hämta datum från query parameter, fallback till idag om inget datum anges
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

    const journeys = await CarJourney.find({
      userId: new mongoose.Types.ObjectId(userId),
      date: targetDate,
    }).populate("carId");

    res.status(200).json(journeys);
  } catch (error) {
    console.error("Error fetching journeys by date:", error);
    res.status(500).json({ message: "Failed to fetch journeys" });
  }
};

export const deleteCars = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "user not authenticated." });
    }

    const carsDelete = await Mycar.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    if (!carsDelete) {
      res.status(400).json({ error: "car not found or not authorized" });
    }
    res.status(200).json({ message: "Car deleted successfully", carsDelete });
  } catch (error) {
    console.error("error deleting cars", error);
    res.status(500).json({ error: "Failed to delete car" });
  }
};

export const deleteJourney = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "user not authenticated." });
    }

    const carJourney = await CarJourney.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    if (!carJourney) {
      res.status(400).json({ error: "car not found or not authorized" });
    }
    res.status(200).json({ message: "Car deleted successfully", carJourney });
  } catch (error) {
    console.error("error deleting cars", error);
    res.status(500).json({ error: "Failed to delete car" });
  }
};
