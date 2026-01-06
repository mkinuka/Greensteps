import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    departure: {
      type: String,
      required: true,
    },
    arrival: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    timeUnit: {
      type: String,
      enum: ["minutes", "hours"],
      required: true,
    },
    trafficType: {
      type: String,
      enum: ["city", "countryside", "highway"],
      required: true,
    },
    distance: {
      type: Number,
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

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
