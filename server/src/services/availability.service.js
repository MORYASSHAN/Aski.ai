import { Availability } from "../models/index.js";
import { NotFoundError } from "../utils/errors.js";

export async function getOrCreateAvailability(userId) {
  let availability = await Availability.findOne({ userId });
  if (!availability) {
    availability = await Availability.create({ userId, timezone: "UTC" });
  }
  return availability;
}

export async function getAvailability(userId) {
  return getOrCreateAvailability(userId);
}

export async function getPublicAvailability(username) {
  const availability = await Availability.findOne()
    .populate({
      path: "userId",
      select: "username name timezone",
      match: { username },
    })
    .lean();
  
  if (!availability || !availability.userId) throw new NotFoundError("Availability not found");
  return availability;
}

export async function updateAvailability(userId, input) {
  const availability = await getOrCreateAvailability(userId);
  
  if (input.timezone) availability.timezone = input.timezone;
  if (input.weeklyHours) availability.weeklyHours = input.weeklyHours;
  if (input.dateOverrides) availability.dateOverrides = input.dateOverrides;
  
  await availability.save();
  return availability;
}

export async function updateWeeklyHours(userId, weeklyHours) {
  const availability = await getOrCreateAvailability(userId);
  availability.weeklyHours = weeklyHours;
  await availability.save();
  return availability;
}

export async function updateDateOverrides(userId, dateOverrides) {
  const availability = await getOrCreateAvailability(userId);
  availability.dateOverrides = dateOverrides;
  await availability.save();
  return availability;
}

export async function addDateOverride(userId, override) {
  const availability = await getOrCreateAvailability(userId);
  const existingIndex = availability.dateOverrides.findIndex(
    (o) => o.date === override.date
  );
  
  if (existingIndex >= 0) {
    availability.dateOverrides[existingIndex] = override;
  } else {
    availability.dateOverrides.push(override);
  }
  
  await availability.save();
  return availability;
}

export async function removeDateOverride(userId, date) {
  const availability = await getOrCreateAvailability(userId);
  availability.dateOverrides = availability.dateOverrides.filter((o) => o.date !== date);
  await availability.save();
  return availability;
}
