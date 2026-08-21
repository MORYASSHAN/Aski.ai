import { Router } from "express";
import {
  create,
  get,
  update,
  addActionItem,
  remove,
  createReportSchema,
  updateReportSchema,
  actionItemSchema,
} from "../controllers/meetingReport.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router({ mergeParams: true });

router.use(requireAuth);

router.post("/", validate(createReportSchema), create);
router.get("/", get);
router.patch("/", validate(updateReportSchema), update);
router.post("/action-items", validate(actionItemSchema), addActionItem);
router.delete("/", remove);

export default router;
