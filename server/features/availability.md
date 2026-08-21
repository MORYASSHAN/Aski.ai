# Availability Feature

## Overview
Manage user availability for booking - weekly recurring hours and date-specific overrides.

## Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/availability` | Get current user availability | Yes |
| GET | `/api/availability/public/:username` | Get public availability | No |
| PATCH | `/api/availability` | Update availability (full) | Yes |
| PATCH | `/api/availability/weekly-hours` | Update weekly hours | Yes |
| PATCH | `/api/availability/date-overrides` | Update date overrides | Yes |
| POST | `/api/availability/date-overrides` | Add single date override | Yes |
| DELETE | `/api/availability/date-overrides/:date` | Remove date override | Yes |

## Request/Response Schemas

### Get Availability
```
GET /api/availability
```

Response (200):
```json
{
  "availability": {
    "_id": "string",
    "userId": "string",
    "timezone": "UTC",
    "weeklyHours": [
      { "day": 1, "startTime": "09:00", "endTime": "17:00" }
    ],
    "dateOverrides": [
      { "date": "2024-12-25", "available": false }
    ],
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
}
```

### Update Availability (Full)
```json
PATCH /api/availability
{
  "timezone": "America/New_York",
  "weeklyHours": [
    { "day": 1, "startTime": "09:00", "endTime": "17:00" },
    { "day": 2, "startTime": "09:00", "endTime": "17:00" }
  ],
  "dateOverrides": [
    { "date": "2024-12-25", "available": false },
    { "date": "2024-12-26", "available": true, "startTime": "10:00", "endTime": "14:00" }
  ]
}
```

### Add Date Override
```json
POST /api/availability/date-overrides
{
  "date": "2024-12-25",
  "available": false
}
// or for custom hours
{
  "date": "2024-12-26",
  "available": true,
  "startTime": "10:00",
  "endTime": "14:00"
}
```

### Time Format
- `startTime`/`endTime`: 24-hour format "HH:MM" (e.g., "09:00", "17:30")
- `date`: ISO date "YYYY-MM-DD"
- `day`: 0=Sunday, 1=Monday, ..., 6=Saturday

## Testing
```bash
# Get availability
curl http://localhost:5000/api/availability \
  -H "Authorization: Bearer <token>"

# Update weekly hours (Mon-Fri 9-5)
curl -X PATCH http://localhost:5000/api/availability/weekly-hours \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"weeklyHours":[{"day":1,"startTime":"09:00","endTime":"17:00"},{"day":2,"startTime":"09:00","endTime":"17:00"},{"day":3,"startTime":"09:00","endTime":"17:00"},{"day":4,"startTime":"09:00","endTime":"17:00"},{"day":5,"startTime":"09:00","endTime":"17:00"}]}'

# Add holiday override
curl -X POST http://localhost:5000/api/availability/date-overrides \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"date":"2024-12-25","available":false}'
```