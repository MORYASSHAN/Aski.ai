import { z } from "zod";
import { asyncHandler } from "../middleware/validate.middleware.js";
import {
  createEventType,
  getEventTypes,
  getEventTypeById,
  getEventTypeBySlug,
  getPublicEventType,
  updateEventType,
  deleteEventType,
  toggleEventType,
} from "../services/eventType.service.js";

export const createEventTypeSchema = z.object({
  roomId: z.string().min(1),
  title: z.string().min(1).max(100),
  durationMinutes: z.number().int().min(5).max(480),
  bufferBeforeMin: z.number().int().min(0).max(60).default(0),
  bufferAfterMin: z.number().int().min(0).max(60).default(0),
  questions: z
    .array(
      z.object({
        label: z.string().min(1).max(200),
        required: z.boolean().default(false),
      })
    )
    .default([]),
  isActive: z.boolean().default(true),
});

export const updateEventTypeSchema = z.object({
  roomId: z.string().min(1).optional(),
  title: z.string().min(1).max(100).optional(),
  durationMinutes: z.number().int().min(5).max(480).optional(),
  bufferBeforeMin: z.number().int().min(0).max(60).optional(),
  bufferAfterMin: z.number().int().min(0).max(60).optional(),
  questions: z
    .array(
      z.object({
        label: z.string().min(1).max(200),
        required: z.boolean().default(false),
      })
    )
    .optional(),
  isActive: z.boolean().optional(),
});

export const listEventTypesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  roomId: z.string().optional(),
  isActive: z.string().optional(),
});

export const create = asyncHandler(async (req, res) => {
  const input = createEventTypeSchema.parse(req.body);
  const eventType = await createEventType(req.user.id, input);
  res.status(201).json({ eventType });
});

export const list = asyncHandler(async (req, res) => {
  const query = listEventTypesSchema.parse(req.query);
  const result = await getEventTypes(req.user.id, query);
  res.json(result);
});

export const get = asyncHandler(async (req, res) => {
  const eventType = await getEventTypeById(req.user.id, req.params.id);
  res.json({ eventType });
});

export const getBySlug = asyncHandler(async (req, res) => {
  const eventType = await getEventTypeBySlug(req.user.id, req.params.slug);
  res.json({ eventType });
});

export const getPublic = asyncHandler(async (req, res) => {
  const eventType = await getPublicEventType(req.params.slug, req.params.username);
  res.json({ eventType });
});

export const update = asyncHandler(async (req, res) => {
  const input = updateEventTypeSchema.parse(req.body);
  const eventType = await updateEventType(req.user.id, req.params.id, input);
  res.json({ eventType });
});

export const remove = asyncHandler(async (req, res) => {
  await deleteEventType(req.user.id, req.params.id);
  res.json({ success: true });
});

export const toggle = asyncHandler(async (req, res) => {
  const eventType = await toggleEventType(req.user.id, req.params.id);
  res.json({ eventType });
});
