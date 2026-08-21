import { Router } from "express";
import {
  get,
  getPublic,
  update,
  updateWeekly,
  updateOverrides,
  addOverride,
  removeOverride,
  updateAvailabilitySchema,
  dateOverrideSchema,
} from "../controllers/availability.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

// Public route
router.get("/public/:username", getPublic);

router.use(requireAuth);

router.get("/", get);
router.patch("/", validate(updateAvailabilitySchema), update);
router.patch("/weekly-hours", updateWeekly);
router.patch("/date-overrides", updateOverrides);
router.post("/date-overrides", validate(dateOverrideSchema), addOverride);
router.delete("/date-overrides/:date", removeOverride);

export default router;
