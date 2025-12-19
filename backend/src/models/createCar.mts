import mongoose from "mongoose";

const createCarSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
    name: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    enum: ['petrol', 'diesel', 'hybrid', 'electric'],
    required: true,
  },
  fuelConsumption: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Mycar = mongoose.model('Mycar', createCarSchema);