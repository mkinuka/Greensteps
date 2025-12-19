import mongoose from "mongoose";

const carJourneySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mycar',
    required: true,
  },
  distance: {
    type: Number,
    required: true,
    min: 0,
  },
  emissions: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CarJourney = mongoose.model('CarJourney', carJourneySchema);
