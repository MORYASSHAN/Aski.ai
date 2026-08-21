import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    required: { type: Boolean, default: false },
  },
  { _id: false },
);

const eventTypeSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true, index: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 5, max: 480 },
    bufferBeforeMin: { type: Number, default: 0, min: 0 },
    bufferAfterMin: { type: Number, default: 0, min: 0 },
    questions: { type: [questionSchema], default: [] },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

eventTypeSchema.index({ ownerId: 1, slug: 1 }, { unique: true });

export const EventType = mongoose.model("EventType", eventTypeSchema);