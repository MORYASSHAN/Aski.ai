import { z } from "zod";
import { asyncHandler } from "../middleware/validate.middleware.js";
import {
  createMeeting,
  getMeetings,
  getMeetingById,
  startMeeting,
  endMeeting,
  addParticipant as addParticipantService,
  removeParticipant as removeParticipantService,
  updateMeetingSettings,
  deleteMeeting,
} from "../services/meeting.service.js";

export const createMeetingSchema = z.object({
  roomId: z.string().optional(),
  bookingId: z.string().optional(),
  participants: z
    .array(
      z.object({
        userId: z.string().optional(),
        guestName: z.string().optional(),
        guestEmail: z.string().email().optional(),
      })
    )
    .default([]),
  settings: z
    .object({
      transcriptionEnabled: z.boolean().optional(),
      recordingEnabled: z.boolean().optional(),
      aiEnabled: z.boolean().optional(),
    })
    .optional(),
});

export const listMeetingsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(["active", "ended"]).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const participantSchema = z.object({
  userId: z.string().optional(),
  guestName: z.string().optional(),
  guestEmail: z.string().email().optional(),
});

export const settingsSchema = z.object({
  transcriptionEnabled: z.boolean().optional(),
  recordingEnabled: z.boolean().optional(),
  aiEnabled: z.boolean().optional(),
});

export const create = asyncHandler(async (req, res) => {
  const input = createMeetingSchema.parse(req.body);
  const meeting = await createMeeting(req.user.id, input);
  res.status(201).json({ meeting });
});

export const list = asyncHandler(async (req, res) => {
  const query = listMeetingsSchema.parse(req.query);
  const result = await getMeetings(req.user.id, query);
  res.json(result);
});

export const get = asyncHandler(async (req, res) => {
  const meeting = await getMeetingById(req.user.id, req.params.id);
  res.json({ meeting });
});

export const start = asyncHandler(async (req, res) => {
  const meeting = await startMeeting(req.user.id, req.params.id);
  res.json({ meeting });
});

export const end = asyncHandler(async (req, res) => {
  const meeting = await endMeeting(req.user.id, req.params.id);
  res.json({ meeting });
});

export const addParticipant = asyncHandler(async (req, res) => {
  const input = participantSchema.parse(req.body);
  const meeting = await addParticipantService(req.user.id, req.params.id, input);
  res.json({ meeting });
});

export const removeParticipant = asyncHandler(async (req, res) => {
  const { participantId } = req.params;
  const meeting = await removeParticipantService(req.user.id, req.params.id, participantId);
  res.json({ meeting });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const input = settingsSchema.parse(req.body);
  const meeting = await updateMeetingSettings(req.user.id, req.params.id, input);
  res.json({ meeting });
});

export const remove = asyncHandler(async (req, res) => {
  await deleteMeeting(req.user.id, req.params.id);
  res.json({ success: true });
});