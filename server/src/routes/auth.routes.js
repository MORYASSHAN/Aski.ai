import { Router } from "express";
import {
  login,
  logout,
  me,
  refresh,
  refreshSchema,
  register,
  loginSchema,
  registerSchema,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", validate(refreshSchema), refresh);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
