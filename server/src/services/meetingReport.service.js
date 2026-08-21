import { MeetingReport, Meeting, ActionItem } from "../models/index.js";
import { NotFoundError } from "../utils/errors.js";

export async function createMeetingReport(hostId, meetingId, input) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  const existingReport = await MeetingReport.findOne({ meetingId });
  if (existingReport) throw new Error("Report already exists for this meeting");

  const actionItems = [];
  if (input.actionItems && input.actionItems.length > 0) {
    const createdItems = await ActionItem.insertMany(
      input.actionItems.map((item) => ({
        meetingId,
        text: item.text,
        assignee: item.assignee,
        status: item.status || "open",
        dueDate: item.dueDate,
      }))
    );
    actionItems.push(...createdItems.map((item) => item._id));
  }

  const report = await MeetingReport.create({
    meetingId,
    summary: input.summary || "",
    keyDecisions: input.keyDecisions || [],
    actionItems,
    talkTimeStats: input.talkTimeStats || [],
  });

  return report;
}

export async function getMeetingReport(hostId, meetingId) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  const report = await MeetingReport.findOne({ meetingId })
    .populate("actionItems")
    .lean();
    
  if (!report) throw new NotFoundError("Report not found");
  return report;
}

export async function updateMeetingReport(hostId, meetingId, input) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  const report = await MeetingReport.findOne({ meetingId });
  if (!report) throw new NotFoundError("Report not found");

  if (input.summary !== undefined) report.summary = input.summary;
  if (input.keyDecisions !== undefined) report.keyDecisions = input.keyDecisions;
  if (input.talkTimeStats !== undefined) report.talkTimeStats = input.talkTimeStats;
  
  await report.save();
  return report;
}

export async function addActionItemToReport(hostId, meetingId, input) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  const report = await MeetingReport.findOne({ meetingId });
  if (!report) throw new NotFoundError("Report not found");

  const actionItem = await ActionItem.create({
    meetingId,
    text: input.text,
    assignee: input.assignee,
    status: input.status || "open",
    dueDate: input.dueDate,
  });

  report.actionItems.push(actionItem._id);
  await report.save();

  return actionItem;
}

export async function deleteMeetingReport(hostId, meetingId) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  const report = await MeetingReport.findOneAndDelete({ meetingId });
  if (!report) throw new NotFoundError("Report not found");

  await ActionItem.deleteMany({ meetingId });
  return { success: true };
}
