# Meetings Feature

## Overview
Manage live video meetings with participants, settings, and lifecycle control.

## Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/meetings` | Create meeting | Yes |
| GET | `/api/meetings` | List meetings | Yes |
| GET | `/api/meetings/:id` | Get meeting details | Yes |
| POST | `/api/meetings/:id/start` | Start meeting | Yes |
| POST | `/api/meetings/:id/end` | End meeting | Yes |
| POST | `/api/meetings/:id/participants` | Add participant | Yes |
| DELETE | `/api/meetings/:id/participants/:participantId` | Remove participant | Yes |
| PATCH | `/api/meetings/:id/settings` | Update meeting settings | Yes |
| DELETE | `/api/meetings/:id` | Delete meeting | Yes |

### Nested Routes
- `/api/meetings/:meetingId/transcript` - Transcript segments
- `/api/meetings/:meetingId/report` - Meeting reports
- `/api/meetings/:meetingId/action-items` - Action items

## Request/Response Schemas

### Create Meeting
```json
POST /api/meetings
{
  "roomId": "string (optional if bookingId provided)",
  "bookingId": "string (optional)",
  "participants": [
    { "userId": "string", "guestName": "string", "guestEmail": "string" }
  ],
  "settings": {
    "transcriptionEnabled": true,
    "recordingEnabled": false,
    "aiEnabled": true
  }
}
```

### Start Meeting
```
POST /api/meetings/:id/start
```
Sets `startedAt` timestamp.

### End Meeting
```
POST /api/meetings/:id/end
```
Sets `endedAt` timestamp.

### Add Participant
```json
POST /api/meetings/:id/participants
{
  "userId": "string (optional)",
  "guestName": "string (optional)",
  "guestEmail": "string (optional)"
}
```

### Update Settings
```json
PATCH /api/meetings/:id/settings
{
  "transcriptionEnabled": true,
  "recordingEnabled": true,
  "aiEnabled": false
}
```

### List Query Params
- `page` (default: 1)
- `limit` (default: 20, max: 100)
- `status` (active|ended)
- `startDate` (ISO date)
- `endDate` (ISO date)

## Testing
```bash
# Create meeting from room
curl -X POST http://localhost:5000/api/meetings \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"roomId": "<room_id>"}'

# Create meeting from booking
curl -X POST http://localhost:5000/api/meetings \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"bookingId": "<booking_id>"}'

# Start meeting
curl -X POST http://localhost:5000/api/meetings/<meeting_id>/start \
  -H "Authorization: Bearer <token>"

# Add guest participant
curl -X POST http://localhost:5000/api/meetings/<meeting_id>/participants \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"guestName": "Guest User", "guestEmail": "guest@example.com"}'

# End meeting
curl -X POST http://localhost:5000/api/meetings/<meeting_id>/end \
  -H "Authorization: Bearer <token>"
```