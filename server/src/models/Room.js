import mongoose, { Schema } from "mongoose";

const roomSettingsSchema = new Schema(
  {
    aiEnabled: { type: Boolean, default: true },
    recordingEnabled: { type: Boolean, default: false },
    waitingRoom: { type: Boolean, default: true },
    maxParticipants: { type: Number, default: 50 },
    theme: { type: String, default: "light" },
  },
  { _id: false },
);

const roomSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    settings: { type: roomSettingsSchema, default: () => ({}) },
    isPersistent: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Room = mongoose.model("Room", roomSchema);