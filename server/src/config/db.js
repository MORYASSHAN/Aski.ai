import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  mongoose.set("strictQuery", true);

  mongoose.connection.on("connected", () => {
    console.log("[db] MongoDB connected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("[db] MongoDB connection error:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("[db] MongoDB disconnected");
  });

  await mongoose.connect(env.MONGODB_URI);
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}