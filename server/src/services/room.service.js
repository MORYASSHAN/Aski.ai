import { Room } from "../models/index.js";
import { NotFoundError, ForbiddenError } from "../utils/errors.js";

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 50);
}

export async function createRoom(ownerId, input) {
  const baseSlug = generateSlug(input.name);
  let slug = baseSlug;
  let counter = 1;
  
  while (await Room.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  const room = await Room.create({
    ownerId,
    slug,
    name: input.name,
    description: input.description || "",
    settings: input.settings || {},
    isPersistent: input.isPersistent !== false,
  });

  return room;
}

export async function getRooms(ownerId, query = {}) {
  const { page = 1, limit = 20, search } = query;
  const filter = { ownerId };
  
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { slug: { $regex: search, $options: "i" } },
    ];
  }

  const [rooms, total] = await Promise.all([
    Room.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Room.countDocuments(filter),
  ]);

  return { rooms, total, page: Number(page), limit: Number(limit) };
}

export async function getRoomById(ownerId, roomId) {
  const room = await Room.findOne({ _id: roomId, ownerId }).lean();
  if (!room) throw new NotFoundError("Room not found");
  return room;
}

export async function getRoomBySlug(slug) {
  const room = await Room.findOne({ slug }).lean();
  if (!room) throw new NotFoundError("Room not found");
  return room;
}

export async function updateRoom(ownerId, roomId, input) {
  const room = await Room.findOne({ _id: roomId, ownerId });
  if (!room) throw new NotFoundError("Room not found");

  if (input.name && input.name !== room.name) {
    const baseSlug = generateSlug(input.name);
    let slug = baseSlug;
    let counter = 1;
    
    while (await Room.findOne({ slug, _id: { $ne: roomId } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    room.slug = slug;
  }

  Object.assign(room, input);
  await room.save();
  return room;
}

export async function deleteRoom(ownerId, roomId) {
  const room = await Room.findOneAndDelete({ _id: roomId, ownerId });
  if (!room) throw new NotFoundError("Room not found");
  return { success: true };
}

export async function getRoomSettings(ownerId, roomId) {
  const room = await Room.findOne({ _id: roomId, ownerId }).select("settings").lean();
  if (!room) throw new NotFoundError("Room not found");
  return room.settings;
}

export async function updateRoomSettings(ownerId, roomId, settings) {
  const room = await Room.findOne({ _id: roomId, ownerId });
  if (!room) throw new NotFoundError("Room not found");
  
  room.settings = { ...room.settings, ...settings };
  await room.save();
  return room.settings;
}
