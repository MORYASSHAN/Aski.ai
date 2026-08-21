import { Router } from "express";
import {
  create,
  list,
  get,
  cancel,
  reschedule,
  upcoming,
  createBookingSchema,
  listBookingsSchema,
  rescheduleSchema,
} from "../controllers/booking.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.use(requireAuth);

router.post("/", validate(createBookingSchema), create);
router.get("/", validate(listBookingsSchema), list);
router.get("/upcoming", upcoming);
router.get("/:id", get);
router.post("/:id/cancel", cancel);
router.post("/:id/reschedule", validate(rescheduleSchema), reschedule);

export default router;
