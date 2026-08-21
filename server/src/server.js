import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./config/db.js";

async function main() {
  await connectDatabase();

  const server = app.listen(env.PORT, () => {
    console.log(`[server] Aski.ai API listening on http://localhost:${env.PORT}`);
  });

  const shutdown = async (signal) => {
    console.log(`[server] ${signal} received, shutting down...`);
    server.close();
    await disconnectDatabase();
    process.exit(0);
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

main().catch((err) => {
  console.error("[server] Failed to start:", err.message);
  process.exit(1);
});