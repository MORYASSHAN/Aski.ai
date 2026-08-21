import mongoose, { Schema } from "mongoose";

const answerSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, default: "" },
  },
  { _id: false },
);

const bookingSchema = new Schema(
  {
    eventTypeId: { type: Schema.Types.ObjectId, ref: "EventType", required: true, index: true },
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true, index: true },
    hostId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    bookerName: { type: String, required: true, trim: true },
    bookerEmail: { type: String, required: true, lowercase: true, trim: true },
    answers: { type: [answerSchema], default: [] },
    startTime: { type: Date, required: true, index: true },
    endTime: { type: Date, required: true },
    status: { type: String, enum: ["confirmed", "cancelled", "rescheduled"], default: "confirmed" },
    meetingId: { type: Schema.Types.ObjectId, ref: "Meeting", index: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

bookingSchema.index({ hostId: 1, startTime: 1 });
bookingSchema.index({ bookerEmail: 1, startTime: 1 });

export const Booking = mongoose.model("Booking", bookingSchema);