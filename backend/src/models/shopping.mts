import mongoose from "mongoose";

const shoppingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemType: {
    type: String,
    enum: ["Clothing", "Electronics", "Furniture", "Material-based-purchases"],
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
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

export const Item = mongoose.model("Item", shoppingSchema);
