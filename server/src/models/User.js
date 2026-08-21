import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    username: { type: String, unique: true, sparse: true, trim: true },
    timezone: { type: String, default: "UTC" },
    avatarUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const { passwordHash: _passwordHash, __v: _v, ...safe } = ret;
    return safe;
  },
});

export const User = mongoose.model("User", userSchema);