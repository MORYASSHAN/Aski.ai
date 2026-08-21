import { z } from "zod";
import { asyncHandler } from "../middleware/validate.middleware.js";
import {
  createMeetingReport,
  getMeetingReport,
  updateMeetingReport,
  addActionItemToReport,
  deleteMeetingReport,
} from "../services/meetingReport.service.js";

export const createReportSchema = z.object({
  summary: z.string().optional(),
  keyDecisions: z.array(z.string()).default([]),
  actionItems: z
    .array(
      z.object({
        text: z.string().min(1),
        assignee: z.string().optional(),
        status: z.enum(["open", "done"]).default("open"),
        dueDate: z.string().datetime().optional(),
      })
    )
    .default([]),
  talkTimeStats: z
    .array(
      z.object({
        participant: z.string(),
        seconds: z.number().int().min(0),
      })
    )
    .default([]),
});

export const updateReportSchema = z.object({
  summary: z.string().optional(),
  keyDecisions: z.array(z.string()).optional(),
  talkTimeStats: z
    .array(
      z.object({
        participant: z.string(),
        seconds: z.number().int().min(0),
      })
    )
    .optional(),
});

export const actionItemSchema = z.object({
  text: z.string().min(1),
  assignee: z.string().optional(),
  status: z.enum(["open", "done"]).default("open"),
  dueDate: z.string().datetime().optional(),
});

export const create = asyncHandler(async (req, res) => {
  const input = createReportSchema.parse(req.body);
  const report = await createMeetingReport(req.user.id, req.params.meetingId, input);
  res.status(201).json({ report });
});

export const get = asyncHandler(async (req, res) => {
  const report = await getMeetingReport(req.user.id, req.params.meetingId);
  res.json({ report });
});

export const update = asyncHandler(async (req, res) => {
  const input = updateReportSchema.parse(req.body);
  const report = await updateMeetingReport(req.user.id, req.params.meetingId, input);
  res.json({ report });
});

export const addActionItem = asyncHandler(async (req, res) => {
  const input = actionItemSchema.parse(req.body);
  const actionItem = await addActionItemToReport(req.user.id, req.params.meetingId, input);
  res.status(201).json({ actionItem });
});

export const remove = asyncHandler(async (req, res) => {
  await deleteMeetingReport(req.user.id, req.params.meetingId);
  res.json({ success: true });
});
