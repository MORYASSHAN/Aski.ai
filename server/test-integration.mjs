// Real end-to-end integration test:
// 1) boots an in-memory MongoDB
// 2) starts the actual server (src/server.js)
// 3) exercises auth + room flows over HTTP, exactly like the frontend api.js does
import { MongoMemoryServer } from "mongodb-memory-server";

const PORT = 5055;
const BASE = `http://localhost:${PORT}/api`;

const mongod = await MongoMemoryServer.create();
process.env.MONGODB_URI = mongod.getUri();
process.env.PORT = String(PORT);

// Start the real server (env is read at import time, so set URI/PORT first)
await import("./src/server.js");

// wait for listen
await new Promise((r) => setTimeout(r, 1500));

const results = [];
function check(name, cond, detail) {
  results.push({ name, ok: !!cond, detail });
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
}

async function call(method, path, body, token) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  return { status: res.status, data };
}

// 1) health
const health = await call("GET", "/health");
check("GET /health", health.status === 200 && health.data?.db === "connected", `db=${health.data?.db}`);

// 2) auth required -> 401
const noAuth = await call("GET", "/rooms");
check("GET /rooms without token -> 401", noAuth.status === 401, `status=${noAuth.status}`);

// 3) register
const reg = await call("POST", "/auth/register", {
  name: "Test User",
  email: `test${Date.now()}@example.com`,
  password: "password123",
});
check("POST /auth/register -> 201 + token", reg.status === 201 && reg.data?.token, `status=${reg.status}`);
const token = reg.data?.token;

// 4) login
const login = await call("POST", "/auth/login", {
  email: reg.data.user.email,
  password: "password123",
});
check("POST /auth/login -> 200 + token", login.status === 200 && login.data?.token, `status=${login.status}`);

// 5) me
const me = await call("GET", "/auth/me", undefined, token);
check("GET /auth/me -> 200 + user", me.status === 200 && me.data?.user?.email === reg.data.user.email, `status=${me.status}`);

// 6) create room (authed)
const room = await call("POST", "/rooms", { name: "Standup Room", description: "Daily", settings: { aiEnabled: true } }, token);
check("POST /rooms (authed) -> 201", room.status === 201 && room.data?.room?._id, `status=${room.status}`);
const roomId = room.data?.room?._id;

// 7) list rooms
const rooms = await call("GET", "/rooms", undefined, token);
check("GET /rooms (authed) -> 200 + array", rooms.status === 200 && Array.isArray(rooms.data?.rooms), `count=${rooms.data?.rooms?.length}`);

// 8) get room by id
const oneRoom = await call("GET", `/rooms/${roomId}`, undefined, token);
check("GET /rooms/:id -> 200", oneRoom.status === 200 && oneRoom.data?.room?._id === roomId, `status=${oneRoom.status}`);

// 9) update room
const upd = await call("PATCH", `/rooms/${roomId}`, { name: "Renamed Room" }, token);
check("PATCH /rooms/:id -> 200 + new name", upd.status === 200 && upd.data?.room?.name === "Renamed Room", `status=${upd.status}`);

// 10) integration create (encrypted payload)
const integ = await call("POST", "/integrations", { category: "livekit", provider: "lk", credentials: { apiKey: "x" } }, token);
check("POST /integrations -> 201 + encrypted", integ.status === 201 && integ.data?.integration?.encryptedPayload, `status=${integ.status}`);

// summary
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
await mongod.stop();
process.exit(failed.length ? 1 : 0);
