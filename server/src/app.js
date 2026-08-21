import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import integrationRoutes from "./routes/integration.routes.js";
import roomRoutes from "./routes/room.routes.js";
import eventTypeRoutes from "./routes/eventType.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "aski-server",
    env: env.NODE_ENV,
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    time: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/integrations", integrationRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/event-types", eventTypeRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/meetings", meetingRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;