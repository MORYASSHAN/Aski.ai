import { ActionItem, Meeting } from "../models/index.js";
import { NotFoundError, ForbiddenError } from "../utils/errors.js";

export async function getActionItems(hostId, meetingId, query = {}) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  const { status, assignee } = query;
  const filter = { meetingId };
  if (status) filter.status = status;
  if (assignee) filter.assignee = assignee;

  return ActionItem.find(filter).sort({ createdAt: 1 }).lean();
}

export async function getActionItemById(hostId, meetingId, actionItemId) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  const actionItem = await ActionItem.findOne({ _id: actionItemId, meetingId }).lean();
  if (!actionItem) throw new NotFoundError("Action item not found");
  return actionItem;
}

export async function updateActionItem(hostId, meetingId, actionItemId, input) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  const actionItem = await ActionItem.findOneAndUpdate(
    { _id: actionItemId, meetingId },
    input,
    { new: true }
  );
  
  if (!actionItem) throw new NotFoundError("Action item not found");
  return actionItem;
}

export async function deleteActionItem(hostId, meetingId, actionItemId) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  const actionItem = await ActionItem.findOneAndDelete({ _id: actionItemId, meetingId });
  if (!actionItem) throw new NotFoundError("Action item not found");
  return { success: true };
}

export async function bulkUpdateActionItems(hostId, meetingId, updates) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  const results = await Promise.all(
    updates.map((update) =>
      ActionItem.findOneAndUpdate(
        { _id: update.id, meetingId },
        update.data,
        { new: true }
      )
    )
  );

  return results.filter(Boolean);
}
