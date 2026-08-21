import { Router } from "express";
import {
  create,
  list,
  get,
  getBySlug,
  getPublic,
  update,
  remove,
  toggle,
  createEventTypeSchema,
  updateEventTypeSchema,
  listEventTypesSchema,
} from "../controllers/eventType.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

// Public route for booking page
router.get("/public/:username/:slug", getPublic);

router.use(requireAuth);

router.post("/", validate(createEventTypeSchema), create);
router.get("/", validate(listEventTypesSchema), list);
router.get("/:id", get);
router.get("/slug/:slug", getBySlug);
router.patch("/:id", validate(updateEventTypeSchema), update);
router.delete("/:id", remove);
router.post("/:id/toggle", toggle);

export default router;
