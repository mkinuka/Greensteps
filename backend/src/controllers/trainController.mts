import Train from "../models/train.mjs";
import type { Request, Response } from "express";

export const saveTrains = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Train save request received:", req.body);
    const userId = (req as any).user?.id;

    if (!userId) {
      console.log("No user ID found in request");
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    console.log("User ID:", userId);
    const { name, distance, category, emissions, date } = req.body;

    if (!name || !distance || !category || !emissions || !date) {
      console.log("Missing required fields:", {
        name,
        distance,
        category,
        emissions,
        date,
      });
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newTrain = new Train({
      userId,
      name,
      distance: Number(distance),
      category,
      emissions: Number(emissions),
      date,
    });

    console.log("Attempting to save train:", newTrain);
    const savedTrain = await newTrain.save();
    console.log("Train saved successfully:", savedTrain);
    res.status(201).json(savedTrain);
  } catch (error) {
    console.error("Error saving train:", error);
    res.status(500).json({ error: "Failed to save train journey" });
  }
};

export const fetchTodayTrains = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const today = new Date().toISOString().split("T")[0]!;
    const trains = await Train.find({ userId, date: today }).sort({
      createdAt: -1,
    });

    // Calculate total emissions for today
    const totalEmissions = trains.reduce(
      (sum, train) => sum + (train.emissions || 0),
      0
    );

    res.json({ trains, totalEmissions });
  } catch (error) {
    console.error("Error fetching today's trains:", error);
    res.status(500).json({ error: "Failed to fetch trains" });
  }
};

export const fetchAllTrains = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const trains = await Train.find({ userId }).sort({ createdAt: -1 });
    res.json(trains);
  } catch (error) {
    console.error("Error fetching trains:", error);
    res.status(500).json({ error: "Failed to fetch trains" });
  }
};
