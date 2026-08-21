# Integrations Feature

## Overview
Manage user integrations for LiveKit, STT, LLM, Email, and Calendar providers. Credentials are encrypted at rest using AES-256-GCM.

## Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/integrations` | Create/update integration | Yes |
| GET | `/api/integrations` | List user integrations | Yes |
| GET | `/api/integrations/:id` | Get integration details | Yes |
| PATCH | `/api/integrations/:id` | Update integration | Yes |
| DELETE | `/api/integrations/:id` | Delete integration | Yes |
| POST | `/api/integrations/:id/validate` | Validate integration credentials | Yes |

## Request/Response Schemas

### Create Integration
```json
POST /api/integrations
{
  "category": "livekit|stt|llm|email|calendar",
  "provider": "string",
  "credentials": { "key": "value" }
}
```

Response (201):
```json
{
  "integration": {
    "_id": "string",
    "userId": "string",
    "category": "string",
    "provider": "string",
    "encryptedPayload": "string",
    "maskedPreview": { "key": "ab****cd" },
    "status": "active|invalid|revoked",
    "lastValidatedAt": "ISO date",
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
}
```

### Validate Integration
```
POST /api/integrations/:id/validate
```

Response (200):
```json
{ "valid": true, "provider": "string" }
// or
{ "valid": false, "error": "string" }
```

## Encryption
- AES-256-GCM with 12-byte IV
- Key from `ENCRYPTION_KEY` env (64 hex chars)
- Stored as `iv:authTag:data` (base64)

## Testing
```bash
# Create LiveKit integration
curl -X POST http://localhost:5000/api/integrations \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "livekit",
    "provider": "livekit-cloud",
    "credentials": { "apiKey": "API_KEY", "apiSecret": "API_SECRET", "wsUrl": "wss://..." }
  }'

# List integrations
curl http://localhost:5000/api/integrations \
  -H "Authorization: Bearer <token>"
```