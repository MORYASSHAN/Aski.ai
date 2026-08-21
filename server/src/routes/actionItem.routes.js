import { Router } from "express";
import {
  list,
  get,
  update,
  remove,
  bulkUpdate,
  updateActionItemSchema,
  listSchema,
  bulkUpdateSchema,
} from "../controllers/actionItem.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router({ mergeParams: true });

router.use(requireAuth);

router.get("/", validate(listSchema), list);
router.post("/bulk", validate(bulkUpdateSchema), bulkUpdate);
router.get("/:actionItemId", get);
router.patch("/:actionItemId", validate(updateActionItemSchema), update);
router.delete("/:actionItemId", remove);

export default router;
