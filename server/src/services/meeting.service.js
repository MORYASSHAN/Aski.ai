import { Meeting, Booking, Room } from "../models/index.js";
import { NotFoundError, ForbiddenError } from "../utils/errors.js";

export async function createMeeting(hostId, input) {
  let room;
  
  if (input.roomId) {
    room = await Room.findOne({ _id: input.roomId, ownerId: hostId });
    if (!room) throw new NotFoundError("Room not found");
  } else if (input.bookingId) {
    const booking = await Booking.findById(input.bookingId).lean();
    if (!booking) throw new NotFoundError("Booking not found");
    if (booking.hostId.toString() !== hostId) throw new ForbiddenError("Not authorized");
    room = await Room.findById(booking.roomId);
  } else {
    throw new Error("Either roomId or bookingId is required");
  }

  const meeting = await Meeting.create({
    roomId: room._id,
    bookingId: input.bookingId || null,
    hostId,
    participants: input.participants || [],
    settings: input.settings || {},
  });

  return meeting;
}

export async function getMeetings(hostId, query = {}) {
  const { page = 1, limit = 20, status, startDate, endDate } = query;
  const filter = { hostId };
  
  if (status === "active") {
    filter.endedAt = { $exists: false };
  } else if (status === "ended") {
    filter.endedAt = { $exists: true };
  }
  
  if (startDate || endDate) {
    filter.startedAt = {};
    if (startDate) filter.startedAt.$gte = new Date(startDate);
    if (endDate) filter.startedAt.$lte = new Date(endDate);
  }

  const [meetings, total] = await Promise.all([
    Meeting.find(filter)
      .populate("roomId", "name slug")
      .populate("bookingId", "bookerName bookerEmail startTime")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Meeting.countDocuments(filter),
  ]);

  return { meetings, total, page: Number(page), limit: Number(limit) };
}

export async function getMeetingById(hostId, meetingId) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId })
    .populate("roomId", "name slug settings")
    .populate("bookingId", "bookerName bookerEmail answers")
    .populate("hostId", "name email username")
    .lean();
    
  if (!meeting) throw new NotFoundError("Meeting not found");
  return meeting;
}

export async function startMeeting(hostId, meetingId) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");
  if (meeting.startedAt) throw new Error("Meeting already started");
  
  meeting.startedAt = new Date();
  await meeting.save();
  return meeting;
}

export async function endMeeting(hostId, meetingId) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");
  if (!meeting.startedAt) throw new Error("Meeting not started");
  if (meeting.endedAt) throw new Error("Meeting already ended");
  
  meeting.endedAt = new Date();
  await meeting.save();
  return meeting;
}

export async function addParticipant(hostId, meetingId, participant) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");
  
  const exists = meeting.participants.some(
    (p) => p.userId?.toString() === participant.userId || p.guestEmail === participant.guestEmail
  );
  
  if (!exists) {
    meeting.participants.push({
      ...participant,
      joinedAt: new Date(),
    });
    await meeting.save();
  }
  
  return meeting;
}

export async function removeParticipant(hostId, meetingId, participantId) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");
  
  const participant = meeting.participants.find(
    (p) => p.userId?.toString() === participantId || p.guestEmail === participantId
  );
  
  if (participant) {
    participant.leftAt = new Date();
    await meeting.save();
  }
  
  return meeting;
}

export async function updateMeetingSettings(hostId, meetingId, settings) {
  const meeting = await Meeting.findOne({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");
  
  meeting.settings = { ...meeting.settings, ...settings };
  await meeting.save();
  return meeting;
}

export async function deleteMeeting(hostId, meetingId) {
  const meeting = await Meeting.findOneAndDelete({ _id: meetingId, hostId });
  if (!meeting) throw new NotFoundError("Meeting not found");
  return { success: true };
}
