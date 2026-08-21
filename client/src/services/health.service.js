import { api } from "./api.js";

export async function fetchHealth() {
  return api.get("/health");
}