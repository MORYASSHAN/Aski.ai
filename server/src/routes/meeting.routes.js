import { Router } from "express";
import {
  create,
  list,
  get,
  start,
  end,
  addParticipant,
  removeParticipant,
  updateSettings,
  remove,
  createMeetingSchema,
  listMeetingsSchema,
  participantSchema,
  settingsSchema,
} from "../controllers/meeting.controller.js";
import transcriptRoutes from "./transcript.routes.js";
import meetingReportRoutes from "./meetingReport.routes.js";
import actionItemRoutes from "./actionItem.routes.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.use(requireAuth);

router.post("/", validate(createMeetingSchema), create);
router.get("/", validate(listMeetingsSchema), list);
router.get("/:id", get);
router.post("/:id/start", start);
router.post("/:id/end", end);
router.post("/:id/participants", validate(participantSchema), addParticipant);
router.delete("/:id/participants/:participantId", removeParticipant);
router.patch("/:id/settings", validate(settingsSchema), updateSettings);
router.delete("/:id", remove);

// Nested routes
router.use("/:meetingId/transcript", transcriptRoutes);
router.use("/:meetingId/report", meetingReportRoutes);
router.use("/:meetingId/action-items", actionItemRoutes);

export default router;
