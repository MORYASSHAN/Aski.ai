import mongoose, { Schema } from "mongoose";

const participantSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    guestName: { type: String, trim: true },
    guestEmail: { type: String, lowercase: true, trim: true },
    joinedAt: { type: Date },
    leftAt: { type: Date },
  },
  { _id: false },
);

const meetingSettingsSchema = new Schema(
  {
    transcriptionEnabled: { type: Boolean, default: true },
    recordingEnabled: { type: Boolean, default: false },
    aiEnabled: { type: Boolean, default: true },
  },
  { _id: false },
);

const meetingSchema = new Schema(
  {
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true, index: true },
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", index: true },
    hostId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    participants: { type: [participantSchema], default: [] },
    startedAt: { type: Date },
    endedAt: { type: Date },
    settings: { type: meetingSettingsSchema, default: () => ({}) },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Meeting = mongoose.model("Meeting", meetingSchema);