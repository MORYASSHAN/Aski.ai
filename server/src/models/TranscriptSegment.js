import mongoose, { Schema } from "mongoose";

const transcriptSegmentSchema = new Schema(
  {
    meetingId: { type: Schema.Types.ObjectId, ref: "Meeting", required: true, index: true },
    speakerId: { type: Schema.Types.ObjectId, ref: "User" },
    speakerLabel: { type: String, trim: true },
    text: { type: String, required: true },
    startTime: { type: Number, required: true },
    endTime: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false },
);

transcriptSegmentSchema.index({ meetingId: 1, startTime: 1 });

export const TranscriptSegment = mongoose.model("TranscriptSegment", transcriptSegmentSchema);