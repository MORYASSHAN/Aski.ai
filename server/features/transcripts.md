# Transcripts Feature

## Overview
Manage meeting transcript segments with speaker identification and timing.

## Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/meetings/:meetingId/transcript` | Add transcript segment | Yes |
| POST | `/api/meetings/:meetingId/transcript/bulk` | Bulk add segments | Yes |
| GET | `/api/meetings/:meetingId/transcript` | List segments (paginated) | Yes |
| GET | `/api/meetings/:meetingId/transcript/full` | Get full transcript | Yes |
| DELETE | `/api/meetings/:meetingId/transcript` | Delete all segments | Yes |

## Request/Response Schemas

### Add Segment
```json
POST /api/meetings/:meetingId/transcript
{
  "speakerId": "string (optional, user ID)",
  "speakerLabel": "string (e.g., 'John Doe')",
  "text": "string",
  "startTime": 120.5,
  "endTime": 125.0
}
```

### Bulk Add Segments
```json
POST /api/meetings/:meetingId/transcript/bulk
{
  "segments": [
    { "speakerLabel": "John", "text": "Hello", "startTime": 0, "endTime": 2 },
    { "speakerLabel": "Jane", "text": "Hi there", "startTime": 2, "endTime": 4 }
  ]
}
```

### List Segments Query Params
- `page` (default: 1)
- `limit` (default: 100, max: 500)
- `startTime` (number, seconds)
- `endTime` (number, seconds)

### Full Transcript
```
GET /api/meetings/:meetingId/transcript/full
```
Returns all segments sorted by startTime for AI processing.

## Time Format
- `startTime`/`endTime`: Seconds from meeting start (float)
- Used for synchronization with audio/video

## Testing
```bash
# Add segment
curl -X POST http://localhost:5000/api/meetings/<meeting_id>/transcript \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"speakerLabel":"John","text":"Welcome to the meeting","startTime":0,"endTime":3}'

# Bulk add
curl -X POST http://localhost:5000/api/meetings/<meeting_id>/transcript/bulk \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"segments":[{"speakerLabel":"John","text":"Hello","startTime":0,"endTime":2},{"speakerLabel":"Jane","text":"Hi","startTime":2,"endTime":4}]}'

# Get full transcript
curl http://localhost:5000/api/meetings/<meeting_id>/transcript/full \
  -H "Authorization: Bearer <token>"
```