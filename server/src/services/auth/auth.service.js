import { ConflictError, UnauthorizedError } from "../../utils/errors.js";
import { hashPassword, verifyPassword } from "./password.service.js";
import { signAccessToken, signRefreshToken } from "./jwt.service.js";
import { User } from "../../models/User.js";

export async function registerUser(input) {
  const existing = await User.findOne({ email: input.email.toLowerCase() }).lean();
  if (existing) {
    throw new ConflictError("An account with this email already exists");
  }

  const passwordHash = await hashPassword(input.password);
  const user = await User.create({
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash,
  });

  return { id: user._id.toString(), name: user.name, email: user.email };
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    throw new UnauthorizedError("Invalid email or password");
  }

  return { 
    id: user._id.toString(), 
    name: user.name, 
    email: user.email,
    username: user.username,
    timezone: user.timezone,
    avatarUrl: user.avatarUrl
  };
}

export async function getUserById(id) {
  const user = await User.findById(id).lean();
  if (!user) return null;
  return { 
    id: user._id.toString(), 
    name: user.name, 
    email: user.email,
    username: user.username,
    timezone: user.timezone,
    avatarUrl: user.avatarUrl
  };
}

export function issueTokens(user) {
  return {
    token: signAccessToken({ sub: user.id, email: user.email }),
    refreshToken: signRefreshToken({ sub: user.id, email: user.email }),
  };
}
