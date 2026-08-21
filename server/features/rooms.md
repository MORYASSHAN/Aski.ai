# Rooms Feature

## Overview
Manage persistent video conference rooms with customizable settings.

## Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/rooms` | Create room | Yes |
| GET | `/api/rooms` | List user rooms | Yes |
| GET | `/api/rooms/slug/:slug` | Get room by slug (public) | No |
| GET | `/api/rooms/:id` | Get room by ID | Yes |
| PATCH | `/api/rooms/:id` | Update room | Yes |
| DELETE | `/api/rooms/:id` | Delete room | Yes |
| GET | `/api/rooms/:id/settings` | Get room settings | Yes |
| PATCH | `/api/rooms/:id/settings` | Update room settings | Yes |

## Request/Response Schemas

### Create Room
```json
POST /api/rooms
{
  "name": "string (1-100 chars)",
  "description": "string (max 500, optional)",
  "settings": {
    "aiEnabled": true,
    "recordingEnabled": false,
    "waitingRoom": true,
    "maxParticipants": 50,
    "theme": "light|dark|system"
  },
  "isPersistent": true
}
```

Response (201):
```json
{
  "room": {
    "_id": "string",
    "ownerId": "string",
    "slug": "auto-generated",
    "name": "string",
    "description": "string",
    "settings": { ... },
    "isPersistent": true,
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
}
```

### Update Settings
```json
PATCH /api/rooms/:id/settings
{
  "aiEnabled": true,
  "recordingEnabled": false,
  "waitingRoom": true,
  "maxParticipants": 100,
  "theme": "dark"
}
```

### List Rooms Query Params
- `page` (default: 1)
- `limit` (default: 20, max: 100)
- `search` (optional, searches name and slug)

## Testing
```bash
# Create room
curl -X POST http://localhost:5000/api/rooms \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Team Standup","description":"Daily standup room"}'

# List rooms
curl "http://localhost:5000/api/rooms?page=1&limit=10" \
  -H "Authorization: Bearer <token>"

# Get room by slug (public)
curl http://localhost:5000/api/rooms/slug/team-standup
```