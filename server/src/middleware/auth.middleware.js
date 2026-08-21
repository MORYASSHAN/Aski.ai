import { UnauthorizedError } from "../utils/errors.js";
import { verifyAccessToken } from "../services/auth/jwt.service.js";
import { getUserById } from "../services/auth/auth.service.js";

export async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Missing authentication token");
    }

    const payload = verifyAccessToken(header.slice("Bearer ".length));
    const user = await getUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedError("User no longer exists");
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}