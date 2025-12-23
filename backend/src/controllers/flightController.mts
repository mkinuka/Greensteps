import Flight from '../models/flight.mjs';
import type { Request, Response } from 'express';

export const saveFlight = async (req: Request, res: Response): Promise<void> => {
  try {
    const { departure, arrival, distance, flightClass, emissions, date } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const flight = new Flight({
      userId,
      departure,
      arrival,
      distance,
      flightClass,
      emissions,
      date
    });

    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    console.error('Error saving flight:', error);
    res.status(500).json({ error: 'Failed to save flight' });
  }
};

export const fetchTodayFlights = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const today = new Date().toISOString().split('T')[0]!;
    const flights = await Flight.find({ userId, date: today }).sort({ createdAt: -1 });
    
    // Calculate total emissions for today
    const totalEmissions = flights.reduce((sum, flight) => sum + (flight.emissions || 0), 0);
    
    res.json({ flights, totalEmissions });

    
  } catch (error) {
    console.error('Error fetching today\'s flights:', error);
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
};

export const fetchAllFlights = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const flights = await Flight.find({ userId }).sort({ createdAt: -1 });
    res.json(flights);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
};
