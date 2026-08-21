import mongoose, { Schema } from "mongoose";

const talkTimeStatSchema = new Schema(
  {
    participant: { type: String, required: true },
    seconds: { type: Number, required: true, default: 0 },
  },
  { _id: false },
);

const meetingReportSchema = new Schema(
  {
    meetingId: { type: Schema.Types.ObjectId, ref: "Meeting", required: true, unique: true, index: true },
    summary: { type: String, default: "" },
    keyDecisions: { type: [String], default: [] },
    actionItems: [{ type: Schema.Types.ObjectId, ref: "ActionItem" }],
    talkTimeStats: { type: [talkTimeStatSchema], default: [] },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const MeetingReport = mongoose.model("MeetingReport", meetingReportSchema);