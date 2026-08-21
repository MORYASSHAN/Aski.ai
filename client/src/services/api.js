const BASE_URL = "/api";

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function getToken() {
  return localStorage.getItem("aski.accessToken");
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? String(data.error)
        : `Request failed with status ${res.status}`;
    throw new ApiError(res.status, message);
  }

  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, { method: "POST", body: body === undefined ? undefined : JSON.stringify(body) }),
  patch: (path, body) =>
    request(path, { method: "PATCH", body: body === undefined ? undefined : JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
};

// ---- Auth ----
export const authApi = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  refresh: (refreshToken) => api.post("/auth/refresh", { refreshToken }),
  me: () => api.get("/auth/me"),
};

// ---- Integrations ----
export const integrationsApi = {
  list: () => api.get("/integrations"),
  create: (payload) => api.post("/integrations", payload),
  get: (id) => api.get(`/integrations/${id}`),
  update: (id, payload) => api.patch(`/integrations/${id}`, payload),
  remove: (id) => api.delete(`/integrations/${id}`),
  validate: (id) => api.post(`/integrations/${id}/validate`, {}),
};

// ---- Rooms ----
export const roomsApi = {
  list: (params = "") => api.get(`/rooms${params}`),
  create: (payload) => api.post("/rooms", payload),
  get: (id) => api.get(`/rooms/${id}`),
  getBySlug: (slug) => api.get(`/rooms/slug/${slug}`),
  update: (id, payload) => api.patch(`/rooms/${id}`, payload),
  remove: (id) => api.delete(`/rooms/${id}`),
  settings: (id) => api.get(`/rooms/${id}/settings`),
  updateSettings: (id, payload) => api.patch(`/rooms/${id}/settings`, payload),
};

// ---- Event types ----
export const eventTypesApi = {
  list: (params = "") => api.get(`/event-types${params}`),
  create: (payload) => api.post("/event-types", payload),
  get: (id) => api.get(`/event-types/${id}`),
  getBySlug: (slug) => api.get(`/event-types/slug/${slug}`),
  getPublic: (username, slug) => api.get(`/event-types/public/${username}/${slug}`),
  update: (id, payload) => api.patch(`/event-types/${id}`, payload),
  remove: (id) => api.delete(`/event-types/${id}`),
  toggle: (id) => api.post(`/event-types/${id}/toggle`, {}),
};

// ---- Availability ----
export const availabilityApi = {
  get: () => api.get("/availability"),
  getPublic: (username) => api.get(`/availability/public/${username}`),
  update: (payload) => api.patch("/availability", payload),
  updateWeekly: (weeklyHours) => api.patch("/availability/weekly-hours", { weeklyHours }),
  updateOverrides: (dateOverrides) => api.patch("/availability/date-overrides", { dateOverrides }),
  addOverride: (payload) => api.post("/availability/date-overrides", payload),
  removeOverride: (date) => api.delete(`/availability/date-overrides/${date}`),
};

// ---- Bookings ----
export const bookingsApi = {
  list: (params = "") => api.get(`/bookings${params}`),
  create: (payload) => api.post("/bookings", payload),
  get: (id) => api.get(`/bookings/${id}`),
  cancel: (id) => api.post(`/bookings/${id}/cancel`, {}),
  reschedule: (id, payload) => api.post(`/bookings/${id}/reschedule`, payload),
  upcoming: (limit) => api.get(`/bookings/upcoming${limit ? `?limit=${limit}` : ""}`),
};

// ---- Meetings ----
export const meetingsApi = {
  list: (params = "") => api.get(`/meetings${params}`),
  create: (payload) => api.post("/meetings", payload),
  get: (id) => api.get(`/meetings/${id}`),
  start: (id) => api.post(`/meetings/${id}/start`, {}),
  end: (id) => api.post(`/meetings/${id}/end`, {}),
  addParticipant: (id, payload) => api.post(`/meetings/${id}/participants`, payload),
  removeParticipant: (id, participantId) =>
    api.delete(`/meetings/${id}/participants/${participantId}`),
  updateSettings: (id, payload) => api.patch(`/meetings/${id}/settings`, payload),
  remove: (id) => api.delete(`/meetings/${id}`),
};

// ---- Transcript ----
export const transcriptApi = {
  list: (meetingId, params = "") => api.get(`/meetings/${meetingId}/transcript${params}`),
  full: (meetingId) => api.get(`/meetings/${meetingId}/transcript/full`),
  create: (meetingId, payload) => api.post(`/meetings/${meetingId}/transcript`, payload),
  bulk: (meetingId, segments) => api.post(`/meetings/${meetingId}/transcript/bulk`, { segments }),
  remove: (meetingId) => api.delete(`/meetings/${meetingId}/transcript`),
};

// ---- Reports ----
export const reportsApi = {
  get: (meetingId) => api.get(`/meetings/${meetingId}/report`),
  create: (meetingId, payload) => api.post(`/meetings/${meetingId}/report`, payload),
  update: (meetingId, payload) => api.patch(`/meetings/${meetingId}/report`, payload),
  addActionItem: (meetingId, payload) =>
    api.post(`/meetings/${meetingId}/report/action-items`, payload),
  remove: (meetingId) => api.delete(`/meetings/${meetingId}/report`),
};

// ---- Action items ----
export const actionItemsApi = {
  list: (meetingId, params = "") => api.get(`/meetings/${meetingId}/action-items${params}`),
  get: (meetingId, id) => api.get(`/meetings/${meetingId}/action-items/${id}`),
  update: (meetingId, id, payload) =>
    api.patch(`/meetings/${meetingId}/action-items/${id}`, payload),
  remove: (meetingId, id) => api.delete(`/meetings/${meetingId}/action-items/${id}`),
  bulk: (meetingId, updates) =>
    api.post(`/meetings/${meetingId}/action-items/bulk`, { updates }),
};
