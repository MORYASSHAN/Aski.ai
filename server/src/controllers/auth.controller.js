import { z } from "zod";
import { asyncHandler } from "../middleware/validate.middleware.js";
import { issueTokens, loginUser, registerUser } from "../services/auth/auth.service.js";
import { signAccessToken, verifyRefreshToken } from "../services/auth/jwt.service.js";

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const register = asyncHandler(async (req, res) => {
  const input = registerSchema.parse(req.body);
  const user = await registerUser(input);
  res.status(201).json({ user, ...issueTokens(user) });
});

export const login = asyncHandler(async (req, res) => {
  const input = loginSchema.parse(req.body);
  const user = await loginUser(input.email, input.password);
  res.json({ user, ...issueTokens(user) });
});

export const logout = asyncHandler(async (_req, res) => {
  res.json({ message: "Logged out" });
});

export const refresh = asyncHandler(async (req, res) => {
  const input = refreshSchema.parse(req.body);
  const payload = verifyRefreshToken(input.refreshToken);
  const token = signAccessToken({ sub: payload.sub, email: payload.email });
  res.json({ token });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
