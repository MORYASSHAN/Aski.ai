import { Router } from "express";
import {
  create,
  list,
  get,
  update,
  remove,
  validate as validateIntegration,
  createIntegrationSchema,
  updateIntegrationSchema,
} from "../controllers/integration.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.use(requireAuth);

router.post("/", validate(createIntegrationSchema), create);
router.get("/", list);
router.get("/:id", get);
router.patch("/:id", validate(updateIntegrationSchema), update);
router.delete("/:id", remove);
router.post("/:id/validate", validateIntegration);

export default router;
