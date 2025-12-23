import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  departure: {
    type: String,
    required: true
  },
  arrival: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  flightClass: {
    type: String,
    enum: ['economy', 'premium', 'business', 'first'],
    required: true
  },
  emissions: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;
