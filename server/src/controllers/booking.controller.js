import { z } from "zod";
import { asyncHandler } from "../middleware/validate.middleware.js";
import {
  createBooking,
  getBookings,
  getBookingById,
  cancelBooking,
  rescheduleBooking,
  getUpcomingBookings,
} from "../services/booking.service.js";

export const createBookingSchema = z.object({
  eventTypeId: z.string().min(1),
  bookerName: z.string().min(1).max(100),
  bookerEmail: z.string().email(),
  answers: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .default([]),
  startTime: z.string().datetime(),
});

export const listBookingsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(["confirmed", "cancelled", "rescheduled"]).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  role: z.enum(["host", "booker"]).default("host"),
});

export const rescheduleSchema = z.object({
  startTime: z.string().datetime(),
});

export const create = asyncHandler(async (req, res) => {
  const input = createBookingSchema.parse(req.body);
  const booking = await createBooking(input);
  res.status(201).json({ booking });
});

export const list = asyncHandler(async (req, res) => {
  const query = listBookingsSchema.parse(req.query);
  const result = await getBookings(req.user.id, query);
  res.json(result);
});

export const get = asyncHandler(async (req, res) => {
  const role = req.query.role === "booker" ? "booker" : "host";
  const booking = await getBookingById(req.user.id, req.params.id, role);
  res.json({ booking });
});

export const cancel = asyncHandler(async (req, res) => {
  const booking = await cancelBooking(req.user.id, req.params.id);
  res.json({ booking });
});

export const reschedule = asyncHandler(async (req, res) => {
  const input = rescheduleSchema.parse(req.body);
  const booking = await rescheduleBooking(req.user.id, req.params.id, input.startTime);
  res.json({ booking });
});

export const upcoming = asyncHandler(async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const bookings = await getUpcomingBookings(req.user.id, limit);
  res.json({ bookings });
});
