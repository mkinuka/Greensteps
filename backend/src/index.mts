import express from "express";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import mealRoutes from "./routes/foodRoute.mjs";
import carRoutes from "./routes/carRotues.mjs";
import flightRoutes from "./routes/flightRoutes.mjs";
import trainRoutes from "./routes/trainRoutes.mjs";
import busRoutes from "./routes/busRoutes.mjs";
import shoppingRoutes from "./routes/shoppingRoutes.mjs";
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Frontend URLs
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || "";
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Greensteps API is running");
});
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/food", mealRoutes);
app.use("/transport", carRoutes);
app.use("/transport", flightRoutes);
app.use("/transport", trainRoutes);
app.use("/transport", busRoutes);
app.use("/shopping", shoppingRoutes);
app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
