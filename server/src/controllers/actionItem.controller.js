import { z } from "zod";
import { asyncHandler } from "../middleware/validate.middleware.js";
import {
  getActionItems,
  getActionItemById,
  updateActionItem,
  deleteActionItem,
  bulkUpdateActionItems,
} from "../services/actionItem.service.js";

export const updateActionItemSchema = z.object({
  text: z.string().min(1).optional(),
  assignee: z.string().optional(),
  status: z.enum(["open", "done"]).optional(),
  dueDate: z.string().datetime().optional(),
});

export const listSchema = z.object({
  status: z.enum(["open", "done"]).optional(),
  assignee: z.string().optional(),
});

export const bulkUpdateSchema = z.object({
  updates: z
    .array(
      z.object({
        id: z.string(),
        data: z.object({
          text: z.string().optional(),
          assignee: z.string().optional(),
          status: z.enum(["open", "done"]).optional(),
          dueDate: z.string().datetime().optional(),
        }),
      })
    )
    .min(1),
});

export const list = asyncHandler(async (req, res) => {
  const query = listSchema.parse(req.query);
  const actionItems = await getActionItems(req.user.id, req.params.meetingId, query);
  res.json({ actionItems });
});

export const get = asyncHandler(async (req, res) => {
  const actionItem = await getActionItemById(req.user.id, req.params.meetingId, req.params.actionItemId);
  res.json({ actionItem });
});

export const update = asyncHandler(async (req, res) => {
  const input = updateActionItemSchema.parse(req.body);
  const actionItem = await updateActionItem(req.user.id, req.params.meetingId, req.params.actionItemId, input);
  res.json({ actionItem });
});

export const remove = asyncHandler(async (req, res) => {
  await deleteActionItem(req.user.id, req.params.meetingId, req.params.actionItemId);
  res.json({ success: true });
});

export const bulkUpdate = asyncHandler(async (req, res) => {
  const input = bulkUpdateSchema.parse(req.body);
  const actionItems = await bulkUpdateActionItems(req.user.id, req.params.meetingId, input.updates);
  res.json({ actionItems });
});
