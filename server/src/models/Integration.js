import mongoose, { Schema } from "mongoose";

const integrationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    category: { type: String, required: true, enum: ["livekit", "stt", "llm", "email", "calendar"] },
    provider: { type: String, required: true },
    encryptedPayload: { type: String, required: true },
    maskedPreview: { type: Schema.Types.Mixed },
    status: { type: String, enum: ["active", "invalid", "revoked"], default: "active" },
    lastValidatedAt: { type: Date },
  },
  { timestamps: true },
);

integrationSchema.index({ userId: 1, category: 1, provider: 1 }, { unique: true });

export const Integration = mongoose.model("Integration", integrationSchema);