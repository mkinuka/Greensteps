import Flight from "../models/flight.mjs";
import type { Request, Response } from "express";

export const saveFlight = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { departure, arrival, distance, flightClass, emissions, date } =
      req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const flight = new Flight({
      userId,
      departure,
      arrival,
      distance,
      flightClass,
      emissions,
      date,
    });

    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    console.error("Error saving flight:", error);
    res.status(500).json({ error: "Failed to save flight" });
  }
};

export const deleteFlight = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Get ID from URL parameter
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    // Find and delete the flight (only if it belongs to the user)
    const deletedFlight = await Flight.findOneAndDelete({
      _id: id,
      userId: userId, // Security: only delete user's own flights
    });

    if (!deletedFlight) {
      res.status(404).json({ error: "Flight not found" });
      return;
    }

    res.status(200).json({
      message: "Flight deleted successfully",
      deletedFlight,
    });
  } catch (error) {
    console.error("Error deleting flight:", error);
    res.status(500).json({ error: "Failed to delete flight" });
  }
};

// Endpoint som tar emot datum som query parameter
export const fetchFlightsByDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    // Hämta datum från query parameter, fallback till idag om inget datum anges
    const { date } = req.query;
    const targetDate: string =
      typeof date === "string" && date.trim().length > 0
        ? date.trim()
        : new Date().toISOString().split("T")[0]!;

    // Validera att datumet har rätt format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(targetDate)) {
      res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD" });
      return;
    }

    const flights = await Flight.find({ userId, date: targetDate }).sort({
      createdAt: -1,
    });

    // Calculate total emissions for the specified date
    const totalEmissions = flights.reduce(
      (sum, flight) => sum + (flight.emissions || 0),
      0
    );

    res.json({ flights, totalEmissions });
  } catch (error) {
    console.error("Error fetching flights by date:", error);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
};

export const fetchAllFlights = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const flights = await Flight.find({ userId }).sort({ createdAt: -1 });
    res.json(flights);
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
};
