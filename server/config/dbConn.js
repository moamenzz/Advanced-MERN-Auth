import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (e) {
    console.log("Error connecting to MongoDB:", e);
    process.exit(1);
  }
};
