# Meeting Reports Feature

## Overview
AI-generated meeting reports with summary, key decisions, action items, and talk time statistics.

## Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/meetings/:meetingId/report` | Create report | Yes |
| GET | `/api/meetings/:meetingId/report` | Get report | Yes |
| PATCH | `/api/meetings/:meetingId/report` | Update report | Yes |
| POST | `/api/meetings/:meetingId/report/action-items` | Add action item | Yes |
| DELETE | `/api/meetings/:meetingId/report` | Delete report | Yes |

## Request/Response Schemas

### Create Report
```json
POST /api/meetings/:meetingId/report
{
  "summary": "Meeting summary text",
  "keyDecisions": ["Decision 1", "Decision 2"],
  "actionItems": [
    { "text": "Follow up with client", "assignee": "John", "status": "open", "dueDate": "2024-01-20T00:00:00.000Z" }
  ],
  "talkTimeStats": [
    { "participant": "John", "seconds": 1200 },
    { "participant": "Jane", "seconds": 800 }
  ]
}
```

Response (201):
```json
{
  "report": {
    "_id": "string",
    "meetingId": "string",
    "summary": "string",
    "keyDecisions": ["string"],
    "actionItems": ["ActionItem._id"],
    "talkTimeStats": [{ "participant": "string", "seconds": 1200 }],
    "generatedAt": "ISO date",
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
}
```

### Get Report
Returns report with populated action items.

### Update Report
```json
PATCH /api/meetings/:meetingId/report
{
  "summary": "Updated summary",
  "keyDecisions": ["Updated decision"],
  "talkTimeStats": [...]
}
```

### Add Action Item
```json
POST /api/meetings/:meetingId/report/action-items
{
  "text": "New action item",
  "assignee": "Jane",
  "status": "open",
  "dueDate": "2024-01-25T00:00:00.000Z"
}
```

Auto-adds to report's actionItems array.

## Testing
```bash
# Create report
curl -X POST http://localhost:5000/api/meetings/<meeting_id>/report \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"summary":"Discussed Q1 goals","keyDecisions":["Hire 2 devs"],"actionItems":[{"text":"Post job listings","assignee":"HR"}]}'

# Get report
curl http://localhost:5000/api/meetings/<meeting_id>/report \
  -H "Authorization: Bearer <token>"

# Add action item
curl -X POST http://localhost:5000/api/meetings/<meeting_id>/report/action-items \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"text":"Review budget","assignee":"Finance"}'
```