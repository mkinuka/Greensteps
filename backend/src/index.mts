import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express(); 
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || '';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

app.get("/", (req, res) => { 
  res.status(200).send("its ok"); 
}); 

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`)
});