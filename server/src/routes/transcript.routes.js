import { Router } from "express";
import {
  create,
  bulkCreate,
  list,
  full,
  remove,
  createTranscriptSegmentSchema,
  bulkCreateSchema,
  listSchema,
} from "../controllers/transcript.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router({ mergeParams: true });

router.use(requireAuth);

router.post("/", validate(createTranscriptSegmentSchema), create);
router.post("/bulk", validate(bulkCreateSchema), bulkCreate);
router.get("/", validate(listSchema), list);
router.get("/full", full);
router.delete("/", remove);

export default router;
