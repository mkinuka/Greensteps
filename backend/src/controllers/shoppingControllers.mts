import type { Request, Response } from "express";
import mongoose from "mongoose";
import { Item } from "../models/shopping.mjs";

export const getShoppingByDate = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "user not authenticated." });
    }

    // Hämta datum från query parameter, fallback till idag om inget datum anges
    const { date } = req.query;
    const targetDate: string =
      typeof date === "string" && date.length > 0
        ? date
        : new Date().toISOString().split("T")[0]!;

    // Validera att datumet har rätt format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(targetDate)) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD" });
    }

    const items = await Item.find({
      userId: new mongoose.Types.ObjectId(userId),
      date: targetDate,
    }).sort({ createdAt: -1 });

    const totalEmissions = items.reduce((sum, item) => sum + item.emissions, 0);

    res.status(200).json({ items, totalEmissions, date: targetDate });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch purchased products" });
  }
};

// function for uploading purchased products to database
export const uploaditems = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "user not authenticated." });
    }
    const { itemType, itemName, quantity, emissions, date } = req.body;

    if (!itemType || !itemName || !quantity || !emissions || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const entry = new Item({
      userId,
      itemType,
      itemName,
      quantity,
      emissions,
      date,
    });

    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error saving items:", error);
    res.status(500).json({ message: "Failed to save entry" });
  }
};

// function for deleting puchased products from database
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }
    const deletedMeal = await Item.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    if (!deletedMeal) {
      res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Successfully deleted item", deletedMeal });
  } catch (error) {
    console.error("error deleting item", error);
    res.status(500).json({ error: "failed to delete item" });
  }
};
