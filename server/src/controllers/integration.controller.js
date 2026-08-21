import { z } from "zod";
import { asyncHandler } from "../middleware/validate.middleware.js";
import {
  createIntegration,
  getIntegrations,
  getIntegrationById,
  updateIntegration,
  deleteIntegration,
  validateIntegration,
} from "../services/integration.service.js";

export const createIntegrationSchema = z.object({
  category: z.enum(["livekit", "stt", "llm", "email", "calendar"]),
  provider: z.string().min(1).max(50),
  credentials: z.record(z.string()),
});

export const updateIntegrationSchema = z.object({
  category: z.enum(["livekit", "stt", "llm", "email", "calendar"]).optional(),
  provider: z.string().min(1).max(50).optional(),
  credentials: z.record(z.string()).optional(),
  status: z.enum(["active", "invalid", "revoked"]).optional(),
});

export const create = asyncHandler(async (req, res) => {
  const input = createIntegrationSchema.parse(req.body);
  const integration = await createIntegration(req.user.id, input);
  res.status(201).json({ integration });
});

export const list = asyncHandler(async (req, res) => {
  const integrations = await getIntegrations(req.user.id);
  res.json({ integrations });
});

export const get = asyncHandler(async (req, res) => {
  const integration = await getIntegrationById(req.user.id, req.params.id);
  res.json({ integration });
});

export const update = asyncHandler(async (req, res) => {
  const input = updateIntegrationSchema.parse(req.body);
  const integration = await updateIntegration(req.user.id, req.params.id, input);
  res.json({ integration });
});

export const remove = asyncHandler(async (req, res) => {
  await deleteIntegration(req.user.id, req.params.id);
  res.json({ success: true });
});

export const validate = asyncHandler(async (req, res) => {
  const result = await validateIntegration(req.user.id, req.params.id);
  res.json(result);
});
