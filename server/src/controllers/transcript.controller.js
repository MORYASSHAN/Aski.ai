import { z } from "zod";
import { asyncHandler } from "../middleware/validate.middleware.js";
import {
  createTranscriptSegment,
  bulkCreateTranscriptSegments,
  getTranscriptSegments,
  getFullTranscript,
  deleteTranscriptSegments,
} from "../services/transcript.service.js";

export const createTranscriptSegmentSchema = z.object({
  speakerId: z.string().optional(),
  speakerLabel: z.string().max(100).optional(),
  text: z.string().min(1),
  startTime: z.number().min(0),
  endTime: z.number().min(0),
});

export const bulkCreateSchema = z.object({
  segments: z
    .array(
      z.object({
        speakerId: z.string().optional(),
        speakerLabel: z.string().max(100).optional(),
        text: z.string().min(1),
        startTime: z.number().min(0),
        endTime: z.number().min(0),
      })
    )
    .min(1),
});

export const listSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(500).default(100),
  startTime: z.coerce.number().optional(),
  endTime: z.coerce.number().optional(),
});

export const create = asyncHandler(async (req, res) => {
  const input = createTranscriptSegmentSchema.parse(req.body);
  const segment = await createTranscriptSegment(req.user.id, req.params.meetingId, input);
  res.status(201).json({ segment });
});

export const bulkCreate = asyncHandler(async (req, res) => {
  const input = bulkCreateSchema.parse(req.body);
  const segments = await bulkCreateTranscriptSegments(req.user.id, req.params.meetingId, input.segments);
  res.status(201).json({ segments });
});

export const list = asyncHandler(async (req, res) => {
  const query = listSchema.parse(req.query);
  const result = await getTranscriptSegments(req.user.id, req.params.meetingId, query);
  res.json(result);
});

export const full = asyncHandler(async (req, res) => {
  const segments = await getFullTranscript(req.user.id, req.params.meetingId);
  res.json({ segments });
});

export const remove = asyncHandler(async (req, res) => {
  await deleteTranscriptSegments(req.user.id, req.params.meetingId);
  res.json({ success: true });
});
