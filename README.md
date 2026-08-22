⚡ Aski.ai

AI-powered video conferencing built to learn WebRTC, SFU architecture, realtime systems, and AI agents.

<p align="center">

React + Node + Express + MongoDB + LiveKit + AI + API 

</p>

🚀 What is Aski.ai?

MeetMind is a secure video conferencing platform where the meeting doesn't end when the call ends.

Video Call
    ↓
Live Transcript
    ↓
AI Understanding
    ↓
Decisions + Actions + Insights
    ↓
Meeting Report

Core idea

Build my own Zoom/Meet-style system while going deeper into:

WebRTC → SFU → LiveKit → Realtime → AI Agent → STT → LLM → Analytics

🧠 Product Vision

Turn a conversation into structured, searchable, actionable knowledge.

During the meeting

🎥 Video + audio

🖥️ Screen sharing

💬 Chat

👥 Multi-user rooms

📝 Live transcription

🤖 AI meeting agent

🔐 Permission & privacy controls

After the meeting

📌 Summary

✅ Action items

🎯 Decisions

❓ Unresolved questions

⚠️ Risks

💡 Suggestions

📊 Meeting insights

👤 Participant feedback

🏗️ Architecture

                  ┌──────────────────────┐
                  │      React App       │
                  │   UI + LiveKit SDK   │
                  └──────────┬───────────┘
                             │
                       WebRTC / Realtime
                             │
                             ▼
                  ┌──────────────────────┐
                  │      LiveKit SFU     │
                  │  Rooms / Tracks /    │
                  │   Participants      │
                  └───────┬───────┬──────┘
                          │       │
                          │       └──────────► AI Agent
                          │                       │
                          │                 STT + LLM
                          │                       │
                          │                       ▼
                          │                  AI Insights
                          │
                          ▼
                 ┌──────────────────┐
                 │ Node + Express   │
                 │      API         │
                 └────────┬─────────┘
                          │
                          ▼
                     MongoDB
                          │
                          ▼
                 Meeting History

🛠️ Tech Stack

Frontend

React
JavaScript / TypeScript
Tailwind CSS
LiveKit React SDK

Backend

Node.js
Express.js
MongoDB
Mongoose
JWT Authentication

Realtime

WebRTC
LiveKit
SFU architecture

AI

Speech-to-Text
LLM
AI Agent
Streaming transcription
Meeting analysis

Later

Redis
BullMQ
Docker
Object Storage
Vector Search / RAG

🎯 Main Systems

1. Realtime Video System

Camera
Microphone
Screen Share
      ↓
   WebRTC
      ↓
 LiveKit SFU
      ↓
Participants

Goal

Understand:

ICE

STUN / TURN

SDP

RTP / RTCP

DTLS / SRTP

SFU

Simulcast

Connection quality

2. AI Meeting Agent

The AI agent becomes another participant/service connected to the meeting.

Participants
      ↓
   LiveKit
      ↓
     AI
      ↓
 Speech-to-Text
      ↓
 Conversation State
      ↓
      LLM
      ↓
Structured Insights

3. Meeting Intelligence

The AI should detect:

TOPICS
DECISIONS
ACTION ITEMS
QUESTIONS
RISKS
UNRESOLVED ISSUES
KEY MOMENTS

Example:

{
  "decision": "Launch on Monday",
  "owner": "Charlie",
  "action": "Finish testing",
  "deadline": "Friday"
}

📊 Meeting Report

┌──────────────────────────────────────┐
│         AI MEETING REPORT            │
├──────────────────────────────────────┤
│ 📌 Summary                           │
│ 🎯 Decisions                         │
│ ✅ Action Items                      │
│ ❓ Open Questions                    │
│ ⚠️ Risks                             │
│ 💡 Suggestions                       │
│ 📊 Meeting Insights                  │
└──────────────────────────────────────┘

Future feature:

Click an insight → jump directly to the transcript timestamp where it happened.

🔐 Privacy & Security

Security is part of the product, not an afterthought.

Planned

JWT authentication

Short-lived LiveKit tokens

Meeting-level permissions

Host / moderator roles

Room locking

Participant approval

Recording consent

AI/transcription consent

Rate limiting

Audit logs

Secret management

Data retention controls

Important

LIVEKIT_SECRET
JWT_SECRET
AI_API_KEY
DATABASE_URL

Never expose these in the React frontend.

🗃️ MongoDB

Planned collections:

users
meetings
participants
transcriptSegments
meetingEvents
meetingReports
participantReports
actionItems

Example:

{
  title: "Product Launch",
  roomName: "launch-room-123",
  hostId: "...",

  settings: {
    aiEnabled: true,
    transcriptionEnabled: true,
    recordingEnabled: false
  }
}

📁 Project Structure

meetmind/
│
├── client/        # React frontend
├── server/        # Node + Express backend
├── ai-agent/      # AI / STT / LLM
│
├── docs/          # Architecture notes
│
├── .env.example
├── docker-compose.yml
└── README.md

🗺️ Roadmap

Phase 1 — WebRTC

Learn WebRTC fundamentals

Build 1-to-1 prototype

Understand STUN / TURN / ICE

Understand SFU

Phase 2 — LiveKit

Connect React to LiveKit

Create rooms

Generate secure tokens

Camera

Microphone

Screen sharing

Multi-user meeting

Phase 3 — MERN

Authentication

User model

Meeting model

Meeting dashboard

Invite links

Permissions

Chat

Meeting history

Phase 4 — AI

Speech-to-text

Live transcript

AI agent

Summary

Decisions

Action items

Questions

Final report

Phase 5 — Advanced

AI meeting coach

Participant insights

Recording

Searchable meeting memory

Redis

BullMQ

RAG

Observability

Load testing

🧪 MVP

The first real milestone:

User
 ↓
Create Meeting
 ↓
Join Room
 ↓
2+ Participants
 ↓
Camera + Mic
 ↓
Screen Share
 ↓
Live Transcript
 ↓
Meeting Ends
 ↓
AI Summary
 ↓
Action Items
 ↓
Report

📚 What I Want to Learn

WebRTC

ICE STUN TURN SDP RTP RTCP DTLS SRTP

Realtime

SFU LiveKit Tracks Rooms Data Presence

Backend

Node.js Express MongoDB Mongoose JWT REST

AI

STT Streaming LLM Structured Output Agents RAG

System Design

Redis Queues Workers Events Scaling Observability

🔥 Build Philosophy

Don't just use WebRTC libraries. Understand what they are doing underneath.

Don't build only an AI wrapper. Build the realtime infrastructure around it.

Build small → understand → scale → optimize.

📌 Current Status

STATUS      : 🟡 Planning
STACK       : MERN + LiveKit + AI
FIRST GOAL  : Multi-user SFU video room
NEXT STEP   : Build React + Express + LiveKit

BYOK NOTE   : User brings their own keys (LiveKit/STT/LLM/Email/Calendar).
              MeetMind never owns provider accounts. .env holds platform
              infra only — NO provider API keys (see PROJECT.md, Part 4).

IMPLEMENTED (foundation)
- Monorepo (npm workspaces): client/, server/
- Server: Express + TypeScript + Mongoose, /api/health
- Auth skeleton: User model, register/login/refresh/logout/me (access + refresh JWT)
- crypto.ts: AES-256-GCM (ENCRYPTION_KEY) for per-user Integration secrets
- .env restricted to platform infra only — no provider keys

NOT YET BUILT
- Integration model + resolver (Phase 2)
- Rooms / Booking / LiveKit video (Phase 3-5)
- STT, AI report, Calendar (Phase 6-8)

NEXT STEP   : Provide infra secrets (MongoDB URI) → confirm Phase 0, then Phase 1 auth UI


💡 Long-Term Idea

Eventually MeetMind should become:

         VIDEO CONFERENCING
                  +
            AI ASSISTANT
                  +
          MEETING MEMORY
                  +
         ACTION MANAGEMENT
                  +
          TEAM KNOWLEDGE

The goal is not just to record meetings.
The goal is to make meetings useful after they happen.

⭐ Project Goal

Build a production-style AI conferencing platform while genuinely understanding WebRTC, SFU architecture, realtime systems, MERN backend engineering, and AI agents.
