import { z } from "zod";
import { asyncHandler } from "../middleware/validate.middleware.js";
import {
  getAvailability,
  getPublicAvailability,
  updateAvailability,
  updateWeeklyHours,
  updateDateOverrides,
  addDateOverride,
  removeDateOverride,
} from "../services/availability.service.js";

export const updateAvailabilitySchema = z.object({
  timezone: z.string().optional(),
  weeklyHours: z
    .array(
      z.object({
        day: z.number().int().min(0).max(6),
        startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
        endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
      })
    )
    .optional(),
  dateOverrides: z
    .array(
      z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        available: z.boolean(),
        startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
        endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
      })
    )
    .optional(),
});

export const dateOverrideSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  available: z.boolean(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
});

export const get = asyncHandler(async (req, res) => {
  const availability = await getAvailability(req.user.id);
  res.json({ availability });
});

export const getPublic = asyncHandler(async (req, res) => {
  const availability = await getPublicAvailability(req.params.username);
  res.json({ availability });
});

export const update = asyncHandler(async (req, res) => {
  const input = updateAvailabilitySchema.parse(req.body);
  const availability = await updateAvailability(req.user.id, input);
  res.json({ availability });
});

export const updateWeekly = asyncHandler(async (req, res) => {
  const weeklyHours = req.body.weeklyHours;
  if (!Array.isArray(weeklyHours)) {
    return res.status(400).json({ error: "weeklyHours must be an array" });
  }
  const availability = await updateWeeklyHours(req.user.id, weeklyHours);
  res.json({ availability });
});

export const updateOverrides = asyncHandler(async (req, res) => {
  const dateOverrides = req.body.dateOverrides;
  if (!Array.isArray(dateOverrides)) {
    return res.status(400).json({ error: "dateOverrides must be an array" });
  }
  const availability = await updateDateOverrides(req.user.id, dateOverrides);
  res.json({ availability });
});

export const addOverride = asyncHandler(async (req, res) => {
  const input = dateOverrideSchema.parse(req.body);
  const availability = await addDateOverride(req.user.id, input);
  res.json({ availability });
});

export const removeOverride = asyncHandler(async (req, res) => {
  const { date } = req.params;
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: "Invalid date format" });
  }
  const availability = await removeDateOverride(req.user.id, date);
  res.json({ availability });
});
