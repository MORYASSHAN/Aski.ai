import { TranscriptSegment, Meeting } from "../models/index.js";
import { NotFoundError, ForbiddenError } from "../utils/errors.js";

export async function createTranscriptSegment(hostId, meetingId, input) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  const segment = await TranscriptSegment.create({
    meetingId,
    speakerId: input.speakerId || null,
    speakerLabel: input.speakerLabel || "Unknown",
    text: input.text,
    startTime: input.startTime,
    endTime: input.endTime,
  });

  return segment;
}

export async function bulkCreateTranscriptSegments(hostId, meetingId, segments) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  const docs = segments.map((s) => ({
    meetingId,
    speakerId: s.speakerId || null,
    speakerLabel: s.speakerLabel || "Unknown",
    text: s.text,
    startTime: s.startTime,
    endTime: s.endTime,
  }));

  const created = await TranscriptSegment.insertMany(docs);
  return created;
}

export async function getTranscriptSegments(hostId, meetingId, query = {}) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  const { page = 1, limit = 100, startTime, endTime } = query;
  const filter = { meetingId };
  
  if (startTime || endTime) {
    filter.startTime = {};
    if (startTime) filter.startTime.$gte = Number(startTime);
    if (endTime) filter.startTime.$lte = Number(endTime);
  }

  const [segments, total] = await Promise.all([
    TranscriptSegment.find(filter)
      .sort({ startTime: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    TranscriptSegment.countDocuments(filter),
  ]);

  return { segments, total, page: Number(page), limit: Number(limit) };
}

export async function getFullTranscript(hostId, meetingId) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  const segments = await TranscriptSegment.find({ meetingId })
    .sort({ startTime: 1 })
    .lean();

  return segments;
}

export async function deleteTranscriptSegments(hostId, meetingId) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");

  await TranscriptSegment.deleteMany({ meetingId });
  return { success: true };
}
