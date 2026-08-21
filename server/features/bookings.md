# Bookings Feature

## Overview
Handle booking creation, management, and availability checking for event types.

## Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/bookings` | Create booking | Yes |
| GET | `/api/bookings` | List bookings (host or booker) | Yes |
| GET | `/api/bookings/upcoming` | Get upcoming bookings | Yes |
| GET | `/api/bookings/:id` | Get booking details | Yes |
| POST | `/api/bookings/:id/cancel` | Cancel booking | Yes |
| POST | `/api/bookings/:id/reschedule` | Reschedule booking | Yes |

## Request/Response Schemas

### Create Booking
```json
POST /api/bookings
{
  "eventTypeId": "string",
  "bookerName": "string",
  "bookerEmail": "string (email)",
  "answers": [
    { "question": "Topic", "answer": "Project discussion" }
  ],
  "startTime": "2024-01-15T10:00:00.000Z"
}
```

Response (201):
```json
{
  "booking": {
    "_id": "string",
    "eventTypeId": "string",
    "roomId": "string",
    "hostId": "string",
    "bookerName": "string",
    "bookerEmail": "string",
    "answers": [...],
    "startTime": "ISO date",
    "endTime": "ISO date",
    "status": "confirmed",
    "meetingId": null,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
}
```

### List Bookings Query Params
- `page` (default: 1)
- `limit` (default: 20, max: 100)
- `status` (confirmed|cancelled|rescheduled)
- `startDate` (ISO date)
- `endDate` (ISO date)
- `role` (host|booker, default: host)

### Reschedule Booking
```json
POST /api/bookings/:id/reschedule
{
  "startTime": "2024-01-15T11:00:00.000Z"
}
```

### Upcoming Bookings
```
GET /api/bookings/upcoming?limit=10
```

Returns confirmed bookings starting from now.

## Availability Checking
- Checks host's weekly hours and date overrides
- Respects event type buffers (before/after)
- Prevents double-booking with ConflictError (409)

## Testing
```bash
# Create booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "eventTypeId": "<event_type_id>",
    "bookerName": "John Doe",
    "bookerEmail": "john@example.com",
    "startTime": "2024-01-15T10:00:00.000Z"
  }'

# List my bookings as host
curl "http://localhost:5000/api/bookings?role=host" \
  -H "Authorization: Bearer <token>"

# Upcoming bookings
curl http://localhost:5000/api/bookings/upcoming \
  -H "Authorization: Bearer <token>"

# Cancel booking
curl -X POST http://localhost:5000/api/bookings/<booking_id>/cancel \
  -H "Authorization: Bearer <token>"
```