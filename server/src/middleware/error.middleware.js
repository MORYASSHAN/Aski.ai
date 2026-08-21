import mongoose from "mongoose";
import { ApiError } from "../utils/errors.js";
import { env } from "../config/env.js";

export function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, _req, res, _next) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join("; ");
    res.status(422).json({ error: message });
    return;
  }

  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ error: "Malformed JSON body" });
    return;
  }

  console.error("[error] Unhandled:", err);
  const message = env.NODE_ENV === "production" ? "Internal server error" : String(err?.message ?? err);
  res.status(500).json({ error: message });
}