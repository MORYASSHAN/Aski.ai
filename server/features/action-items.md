# Action Items Feature

## Overview
Manage action items within meeting reports - track tasks, assignees, status, and due dates.

## Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/meetings/:meetingId/action-items` | List action items | Yes |
| POST | `/api/meetings/:meetingId/action-items/bulk` | Bulk update action items | Yes |
| GET | `/api/meetings/:meetingId/action-items/:actionItemId` | Get single action item | Yes |
| PATCH | `/api/meetings/:meetingId/action-items/:actionItemId` | Update action item | Yes |
| DELETE | `/api/meetings/:meetingId/action-items/:actionItemId` | Delete action item | Yes |

## Request/Response Schemas

### List Action Items Query Params
- `status` (open|done)
- `assignee` (string)

Response (200):
```json
{
  "actionItems": [
    {
      "_id": "string",
      "meetingId": "string",
      "text": "string",
      "assignee": "string",
      "status": "open|done",
      "dueDate": "ISO date|null",
      "createdAt": "ISO date",
      "updatedAt": "ISO date"
    }
  ]
}
```

### Bulk Update
```json
POST /api/meetings/:meetingId/action-items/bulk
{
  "updates": [
    { "id": "action_item_id", "data": { "status": "done" } },
    { "id": "action_item_id", "data": { "assignee": "John", "dueDate": "2024-01-30T00:00:00.000Z" } }
  ]
}
```

### Update Single
```json
PATCH /api/meetings/:meetingId/action-items/:actionItemId
{
  "text": "Updated text",
  "assignee": "Jane",
  "status": "done",
  "dueDate": "2024-01-25T00:00:00.000Z"
}
```

## Testing
```bash
# List action items
curl "http://localhost:5000/api/meetings/<meeting_id>/action-items?status=open" \
  -H "Authorization: Bearer <token>"

# Mark as done
curl -X PATCH http://localhost:5000/api/meetings/<meeting_id>/action-items/<action_item_id> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"status":"done"}'

# Bulk update
curl -X POST http://localhost:5000/api/meetings/<meeting_id>/action-items/bulk \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"updates":[{"id":"<id1>","data":{"status":"done"}},{"id":"<id2>","data":{"assignee":"John"}}]}'
```