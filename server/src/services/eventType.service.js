import { EventType, Room } from "../models/index.js";
import { NotFoundError, ForbiddenError } from "../utils/errors.js";

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 50);
}

export async function createEventType(ownerId, input) {
  const room = await Room.findOne({ _id: input.roomId, ownerId });
  if (!room) throw new NotFoundError("Room not found");

  const baseSlug = generateSlug(input.title);
  let slug = baseSlug;
  let counter = 1;
  
  while (await EventType.findOne({ ownerId, slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  const eventType = await EventType.create({
    ownerId,
    roomId: input.roomId,
    title: input.title,
    slug,
    durationMinutes: input.durationMinutes,
    bufferBeforeMin: input.bufferBeforeMin || 0,
    bufferAfterMin: input.bufferAfterMin || 0,
    questions: input.questions || [],
    isActive: input.isActive !== false,
  });

  return eventType;
}

export async function getEventTypes(ownerId, query = {}) {
  const { page = 1, limit = 20, roomId, isActive } = query;
  const filter = { ownerId };
  
  if (roomId) filter.roomId = roomId;
  if (isActive !== undefined) filter.isActive = isActive === "true";

  const [eventTypes, total] = await Promise.all([
    EventType.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    EventType.countDocuments(filter),
  ]);

  return { eventTypes, total, page: Number(page), limit: Number(limit) };
}

export async function getEventTypeById(ownerId, eventTypeId) {
  const eventType = await EventType.findOne({ _id: eventTypeId, ownerId }).lean();
  if (!eventType) throw new NotFoundError("Event type not found");
  return eventType;
}

export async function getEventTypeBySlug(ownerId, slug) {
  const eventType = await EventType.findOne({ ownerId, slug }).lean();
  if (!eventType) throw new NotFoundError("Event type not found");
  return eventType;
}

export async function getPublicEventType(slug, username) {
  const eventType = await EventType.findOne({ slug, isActive: true })
    .populate({
      path: "ownerId",
      select: "username name avatarUrl timezone",
      match: { username },
    })
    .lean();
  
  if (!eventType || !eventType.ownerId) throw new NotFoundError("Event type not found");
  return eventType;
}

export async function updateEventType(ownerId, eventTypeId, input) {
  const eventType = await EventType.findOne({ _id: eventTypeId, ownerId });
  if (!eventType) throw new NotFoundError("Event type not found");

  if (input.title && input.title !== eventType.title) {
    const baseSlug = generateSlug(input.title);
    let slug = baseSlug;
    let counter = 1;
    
    while (await EventType.findOne({ ownerId, slug, _id: { $ne: eventTypeId } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    eventType.slug = slug;
  }

  Object.assign(eventType, input);
  await eventType.save();
  return eventType;
}

export async function deleteEventType(ownerId, eventTypeId) {
  const eventType = await EventType.findOneAndDelete({ _id: eventTypeId, ownerId });
  if (!eventType) throw new NotFoundError("Event type not found");
  return { success: true };
}

export async function toggleEventType(ownerId, eventTypeId) {
  const eventType = await EventType.findOne({ _id: eventTypeId, ownerId });
  if (!eventType) throw new NotFoundError("Event type not found");
  
  eventType.isActive = !eventType.isActive;
  await eventType.save();
  return eventType;
}
