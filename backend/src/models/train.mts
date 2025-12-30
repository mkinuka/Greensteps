import mongoose, { Schema, Document } from "mongoose";

interface ITrain extends Document {
  userId: string;
  name: string;
  distance: number;
  category: "tram" | "national" | "underground";
  emissions: number;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const trainSchema = new Schema<ITrain>(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["tram", "national", "underground"],
      required: true,
    },
    emissions: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Train = mongoose.model<ITrain>("Train", trainSchema);
export default Train;
