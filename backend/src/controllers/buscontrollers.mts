import type { Request, Response } from "express";
import Bus from "../models/bus.mjs";

export const saveBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      departure,
      arrival,
      duration,
      timeUnit,
      trafficType,
      distance,
      emissions,
      date,
    } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    if (
      !departure ||
      !arrival ||
      !duration ||
      !timeUnit ||
      !trafficType ||
      !distance ||
      !emissions ||
      !date
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const bus = new Bus({
      userId,
      departure,
      arrival,
      duration,
      timeUnit,
      trafficType,
      distance,
      emissions,
      date,
    });

    await bus.save();
    res.status(201).json(bus);
  } catch (error) {
    console.error("Error saving bus journey:", error);
    res.status(500).json({ error: "Failed to save bus journey" });
  }
};

export const deleteBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    if (!id) {
      res.status(400).json({ error: "Bus ID is required" });
      return;
    }

    // Find and delete the bus (only if it belongs to the user)
    const deletedBus = await Bus.findOneAndDelete({
      _id: id,
      userId: userId, // Security: only delete user's own buses
    });

    if (!deletedBus) {
      res.status(404).json({ error: "Bus journey not found" });
      return;
    }

    res.status(200).json({
      message: "Bus journey deleted successfully",
      deletedBus,
    });
  } catch (error) {
    console.error("Error deleting bus journey:", error);
    res.status(500).json({ error: "Failed to delete bus journey" });
  }
};

export const fetchBusesByDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const { date } = req.query;
    const targetDate: string =
      typeof date === "string" && date.trim().length > 0
        ? date.trim()
        : new Date().toISOString().split("T")[0]!;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(targetDate)) {
      res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD" });
      return;
    }

    const buses = await Bus.find({ userId, date: targetDate }).sort({
      createdAt: -1,
    });

    const totalEmissions = buses.reduce(
      (sum, bus) => sum + (bus.emissions || 0),
      0
    );

    res.json({ buses, totalEmissions });
  } catch (error) {
    console.error("Error fetching buses by date:", error);
    res.status(500).json({ error: "Failed to fetch bus journeys" });
  }
};
