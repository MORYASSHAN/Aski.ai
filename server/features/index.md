# Aski.ai Server Features

## Overview
Complete backend API for Aski.ai - AI-powered secure video conferencing platform.

## Feature Summary

| Feature | Base Path | Description |
|---------|-----------|-------------|
| [Authentication](./auth.md) | `/api/auth` | User registration, login, JWT tokens |
| [Integrations](./integrations.md) | `/api/integrations` | Encrypted BYOK provider credentials |
| [Rooms](./rooms.md) | `/api/rooms` | Persistent video conference rooms |
| [Event Types](./event-types.md) | `/api/event-types` | Booking event types with scheduling |
| [Availability](./availability.md) | `/api/availability` | Host availability management |
| [Bookings](./bookings.md) | `/api/bookings` | Appointment booking and management |
| [Meetings](./meetings.md) | `/api/meetings` | Live meeting lifecycle and participants |
| [Transcripts](./transcripts.md) | `/api/meetings/:id/transcript` | Meeting transcript segments |
| [Meeting Reports](./meeting-reports.md) | `/api/meetings/:id/report` | AI-generated meeting summaries |
| [Action Items](./action-items.md) | `/api/meetings/:id/action-items` | Task tracking from meetings |

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        API Routes                            │
├─────────────────────────────────────────────────────────────┤
│  Auth → Integrations → Rooms → EventTypes → Availability   │
│                                    ↓                        │
│                              Bookings → Meetings            │
│                                    ↓                        │
│                          Transcript → Report → ActionItems │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      MongoDB Models                          │
│  User │ Integration │ Room │ EventType │ Availability      │
│  Booking │ Meeting │ TranscriptSegment │ MeetingReport     │
│  ActionItem                                                          │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start

```bash
# Install dependencies
cd server && npm install

# Set up .env (see .env.example)
# Required: MONGODB_URI, JWT secrets, ENCRYPTION_KEY

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

## Health Check
```
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "service": "aski-server",
  "env": "development",
  "db": "connected",
  "time": "2024-01-15T10:00:00.000Z"
}
```

## Error Format
All errors follow consistent format:
```json
{ "error": "Human-readable error message" }
```

Status codes:
- 400 - Bad Request
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 409 - Conflict
- 422 - Validation Error
- 500 - Internal Server Error

## Testing
See individual feature files for curl examples. All endpoints require `Authorization: Bearer <token>` except:
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/event-types/public/:username/:slug`
- `GET /api/rooms/slug/:slug`
- `GET /api/availability/public/:username`