import { z } from "zod";
import { asyncHandler } from "../middleware/validate.middleware.js";
import {
  createRoom,
  getRooms,
  getRoomById,
  getRoomBySlug,
  updateRoom,
  deleteRoom,
  getRoomSettings,
  updateRoomSettings,
} from "../services/room.service.js";

export const createRoomSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  settings: z
    .object({
      aiEnabled: z.boolean().optional(),
      recordingEnabled: z.boolean().optional(),
      waitingRoom: z.boolean().optional(),
      maxParticipants: z.number().int().min(2).max(500).optional(),
      theme: z.enum(["light", "dark", "system"]).optional(),
    })
    .optional(),
  isPersistent: z.boolean().optional(),
});

export const updateRoomSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  settings: z
    .object({
      aiEnabled: z.boolean().optional(),
      recordingEnabled: z.boolean().optional(),
      waitingRoom: z.boolean().optional(),
      maxParticipants: z.number().int().min(2).max(500).optional(),
      theme: z.enum(["light", "dark", "system"]).optional(),
    })
    .optional(),
  isPersistent: z.boolean().optional(),
});

export const updateSettingsSchema = z.object({
  aiEnabled: z.boolean().optional(),
  recordingEnabled: z.boolean().optional(),
  waitingRoom: z.boolean().optional(),
  maxParticipants: z.number().int().min(2).max(500).optional(),
  theme: z.enum(["light", "dark", "system"]).optional(),
});

export const listRoomsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
});

export const create = asyncHandler(async (req, res) => {
  const input = createRoomSchema.parse(req.body);
  const room = await createRoom(req.user.id, input);
  res.status(201).json({ room });
});

export const list = asyncHandler(async (req, res) => {
  const query = listRoomsSchema.parse(req.query);
  const result = await getRooms(req.user.id, query);
  res.json(result);
});

export const get = asyncHandler(async (req, res) => {
  const room = await getRoomById(req.user.id, req.params.id);
  res.json({ room });
});

export const getBySlug = asyncHandler(async (req, res) => {
  const room = await getRoomBySlug(req.params.slug);
  res.json({ room });
});

export const update = asyncHandler(async (req, res) => {
  const input = updateRoomSchema.parse(req.body);
  const room = await updateRoom(req.user.id, req.params.id, input);
  res.json({ room });
});

export const remove = asyncHandler(async (req, res) => {
  await deleteRoom(req.user.id, req.params.id);
  res.json({ success: true });
});

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await getRoomSettings(req.user.id, req.params.id);
  res.json({ settings });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const input = updateSettingsSchema.parse(req.body);
  const settings = await updateRoomSettings(req.user.id, req.params.id, input);
  res.json({ settings });
});
