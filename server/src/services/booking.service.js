import { Booking, EventType, Availability } from "../models/index.js";
import { NotFoundError, ConflictError, BadRequestError } from "../utils/errors.js";

export async function createBooking(input) {
  const eventType = await EventType.findById(input.eventTypeId).lean();
  if (!eventType) throw new NotFoundError("Event type not found");
  if (!eventType.isActive) throw new BadRequestError("Event type is not active");

  const startTime = new Date(input.startTime);
  const endTime = new Date(startTime.getTime() + eventType.durationMinutes * 60000);
  
  const bufferBefore = eventType.bufferBeforeMin * 60000;
  const bufferAfter = eventType.bufferAfterMin * 60000;
  const bufferedStart = new Date(startTime.getTime() - bufferBefore);
  const bufferedEnd = new Date(endTime.getTime() + bufferAfter);

  const existingBooking = await Booking.findOne({
    eventTypeId: input.eventTypeId,
    status: "confirmed",
    $or: [
      { startTime: { $lt: bufferedEnd }, endTime: { $gt: bufferedStart } },
    ],
  });

  if (existingBooking) {
    throw new ConflictError("Time slot is not available");
  }

  const availability = await Availability.findOne({ userId: eventType.ownerId });
  if (availability) {
    const dayOfWeek = startTime.getDay();
    const daySchedule = availability.weeklyHours.find((h) => h.day === dayOfWeek);
    
    if (!daySchedule || !daySchedule.available) {
      throw new BadRequestError("Host is not available at this time");
    }

    const timeStr = startTime.toTimeString().slice(0, 5);
    if (timeStr < daySchedule.startTime || timeStr > daySchedule.endTime) {
      throw new BadRequestError("Time is outside host's availability");
    }

    const dateStr = startTime.toISOString().split("T")[0];
    const override = availability.dateOverrides.find((o) => o.date === dateStr);
    if (override) {
      if (!override.available) throw new BadRequestError("Host is not available on this date");
      if (override.startTime && timeStr < override.startTime) {
        throw new BadRequestError("Time is outside host's availability");
      }
      if (override.endTime && timeStr > override.endTime) {
        throw new BadRequestError("Time is outside host's availability");
      }
    }
  }

  const booking = await Booking.create({
    eventTypeId: input.eventTypeId,
    roomId: eventType.roomId,
    hostId: eventType.ownerId,
    bookerName: input.bookerName,
    bookerEmail: input.bookerEmail.toLowerCase(),
    answers: input.answers || [],
    startTime,
    endTime,
    status: "confirmed",
  });

  return booking;
}

export async function getBookings(userId, query = {}) {
  const { page = 1, limit = 20, status, startDate, endDate, role = "host" } = query;
  const filter = {};
  
  if (role === "host") {
    filter.hostId = userId;
  } else {
    filter.bookerEmail = userId; // assuming email
  }
  
  if (status) filter.status = status;
  if (startDate || endDate) {
    filter.startTime = {};
    if (startDate) filter.startTime.$gte = new Date(startDate);
    if (endDate) filter.startTime.$lte = new Date(endDate);
  }

  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .populate("eventTypeId", "title durationMinutes")
      .populate("roomId", "name slug")
      .sort({ startTime: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Booking.countDocuments(filter),
  ]);

  return { bookings, total, page: Number(page), limit: Number(limit) };
}

export async function getBookingById(userId, bookingId, role = "host") {
  const filter = { _id: bookingId };
  if (role === "host") filter.hostId = userId;
  else filter.bookerEmail = userId;
  
  const booking = await Booking.findOne(filter)
    .populate("eventTypeId", "title durationMinutes questions")
    .populate("roomId", "name slug settings")
    .populate("hostId", "name email username timezone avatarUrl")
    .lean();
    
  if (!booking) throw new NotFoundError("Booking not found");
  return booking;
}

export async function getBookingByMeetingId(meetingId) {
  return Booking.findOne({ meetingId }).lean();
}

export async function cancelBooking(userId, bookingId) {
  const booking = await Booking.findOne({ _id: bookingId, hostId: userId });
  if (!booking) throw new NotFoundError("Booking not found");
  if (booking.status === "cancelled") throw new BadRequestError("Booking already cancelled");
  
  booking.status = "cancelled";
  await booking.save();
  return booking;
}

export async function rescheduleBooking(userId, bookingId, newStartTime) {
  const booking = await Booking.findOne({ _id: bookingId, hostId: userId });
  if (!booking) throw new NotFoundError("Booking not found");
  if (booking.status !== "confirmed") throw new BadRequestError("Can only reschedule confirmed bookings");
  
  const eventType = await EventType.findById(booking.eventTypeId).lean();
  if (!eventType) throw new NotFoundError("Event type not found");
  
  const startTime = new Date(newStartTime);
  const endTime = new Date(startTime.getTime() + eventType.durationMinutes * 60000);
  
  const existingBooking = await Booking.findOne({
    eventTypeId: booking.eventTypeId,
    status: "confirmed",
    _id: { $ne: bookingId },
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
    ],
  });

  if (existingBooking) {
    throw new ConflictError("Time slot is not available");
  }

  booking.startTime = startTime;
  booking.endTime = endTime;
  booking.status = "rescheduled";
  await booking.save();
  
  return booking;
}

export async function getUpcomingBookings(userId, limit = 10) {
  return Booking.find({
    hostId: userId,
    status: "confirmed",
    startTime: { $gte: new Date() },
  })
    .populate("eventTypeId", "title")
    .populate("roomId", "name slug")
    .sort({ startTime: 1 })
    .limit(limit)
    .lean();
}
