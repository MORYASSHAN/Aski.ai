import { Router } from "express";
import {
  create,
  list,
  get,
  getBySlug,
  update,
  remove,
  getSettings,
  updateSettings,
  createRoomSchema,
  updateRoomSchema,
  updateSettingsSchema,
  listRoomsSchema,
} from "../controllers/room.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.use(requireAuth);

router.post("/", validate(createRoomSchema), create);
router.get("/", validate(listRoomsSchema), list);
router.get("/slug/:slug", getBySlug);
router.get("/:id", get);
router.patch("/:id", validate(updateRoomSchema), update);
router.delete("/:id", remove);
router.get("/:id/settings", getSettings);
router.patch("/:id/settings", validate(updateSettingsSchema), updateSettings);

export default router;
