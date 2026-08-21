import mongoose, { Schema } from "mongoose";

const actionItemSchema = new Schema(
  {
    meetingId: { type: Schema.Types.ObjectId, ref: "Meeting", required: true, index: true },
    text: { type: String, required: true, trim: true },
    assignee: { type: String, trim: true },
    status: { type: String, enum: ["open", "done"], default: "open" },
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const ActionItem = mongoose.model("ActionItem", actionItemSchema);