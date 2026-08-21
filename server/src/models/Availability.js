import mongoose, { Schema } from "mongoose";

const weeklyHoursSchema = new Schema(
  {
    day: { type: Number, required: true, min: 0, max: 6 },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { _id: false },
);

const dateOverrideSchema = new Schema(
  {
    date: { type: String, required: true },
    available: { type: Boolean, required: true },
    startTime: { type: String },
    endTime: { type: String },
  },
  { _id: false },
);

const availabilitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    timezone: { type: String, required: true, default: "UTC" },
    weeklyHours: { type: [weeklyHoursSchema], default: [] },
    dateOverrides: { type: [dateOverrideSchema], default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Availability = mongoose.model("Availability", availabilitySchema);