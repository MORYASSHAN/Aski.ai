# Event Types Feature

## Overview
Manage booking event types linked to rooms. Each event type has duration, buffers, and custom questions.

## Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/event-types` | Create event type | Yes |
| GET | `/api/event-types` | List user event types | Yes |
| GET | `/api/event-types/:id` | Get event type by ID | Yes |
| GET | `/api/event-types/slug/:slug` | Get event type by slug | Yes |
| GET | `/api/event-types/public/:username/:slug` | Public event type for booking | No |
| PATCH | `/api/event-types/:id` | Update event type | Yes |
| DELETE | `/api/event-types/:id` | Delete event type | Yes |
| POST | `/api/event-types/:id/toggle` | Toggle active status | Yes |

## Request/Response Schemas

### Create Event Type
```json
POST /api/event-types
{
  "roomId": "string",
  "title": "string (1-100 chars)",
  "durationMinutes": 30,
  "bufferBeforeMin": 5,
  "bufferAfterMin": 5,
  "questions": [
    { "label": "What would you like to discuss?", "required": true }
  ],
  "isActive": true
}
```

Response (201):
```json
{
  "eventType": {
    "_id": "string",
    "ownerId": "string",
    "roomId": "string",
    "title": "string",
    "slug": "auto-generated",
    "durationMinutes": 30,
    "bufferBeforeMin": 5,
    "bufferAfterMin": 5,
    "questions": [...],
    "isActive": true,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
}
```

### Public Event Type (for booking page)
```
GET /api/event-types/public/:username/:slug
```

Returns event type with owner info (name, username, avatarUrl, timezone) for booking page.

### List Query Params
- `page` (default: 1)
- `limit` (default: 20, max: 100)
- `roomId` (optional filter)
- `isActive` (optional filter: "true"/"false")

## Testing
```bash
# Create event type
curl -X POST http://localhost:5000/api/event-types \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": "<room_id>",
    "title": "30-min Consultation",
    "durationMinutes": 30,
    "bufferBeforeMin": 5,
    "bufferAfterMin": 5,
    "questions": [{"label": "Topic", "required": true}]
  }'

# Public access (booking page)
curl http://localhost:5000/api/event-types/public/johndoe/30-min-consultation
```