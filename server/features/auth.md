# Authentication Feature

## Overview
User authentication with JWT-based access and refresh tokens. Supports registration, login, logout, token refresh, and current user retrieval.

## Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/refresh` | Refresh access token | No |
| POST | `/api/auth/logout` | Logout (stateless) | No |
| GET | `/api/auth/me` | Get current user | Yes |

## Request/Response Schemas

### Register
```json
POST /api/auth/register
{
  "name": "string (2-80 chars)",
  "email": "string (valid email)",
  "password": "string (8-128 chars)"
}
```

Response (201):
```json
{
  "user": { "id": "string", "name": "string", "email": "string" },
  "token": "string (JWT access token)",
  "refreshToken": "string (JWT refresh token)"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "string",
  "password": "string"
}
```

Response (200): Same as register

### Refresh Token
```json
POST /api/auth/refresh
{
  "refreshToken": "string"
}
```

Response (200):
```json
{ "token": "string (new JWT access token)" }
```

### Get Current User
```
GET /api/auth/me
Authorization: Bearer <access_token>
```

Response (200):
```json
{ "user": { "id": "string", "name": "string", "email": "string", "username": "string", "timezone": "string", "avatarUrl": "string" } }
```

## Security
- Passwords hashed with bcrypt (12 rounds)
- Access tokens: 15 min expiry
- Refresh tokens: 7 day expiry
- Tokens signed with HS256

## Testing
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get me
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <access_token>"
```