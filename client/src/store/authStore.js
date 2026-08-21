import { create } from "zustand";
import { authApi } from "../services/api.js";

const TOKEN_KEY = "aski.accessToken";
const REFRESH_KEY = "aski.refreshToken";
const USER_KEY = "aski.user";

function loadUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const useAuth = create((set, get) => ({
  user: loadUser(),
  token: localStorage.getItem(TOKEN_KEY),
  status: "idle", // idle | loading | error
  error: null,

  setSession: (data) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(REFRESH_KEY, data.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    set({ user: data.user, token: data.token, status: "idle", error: null });
  },

  register: async (payload) => {
    set({ status: "loading", error: null });
    try {
      const data = await authApi.register(payload);
      get().setSession(data);
      return data;
    } catch (err) {
      set({ status: "error", error: err.message });
      throw err;
    }
  },

  login: async (payload) => {
    set({ status: "loading", error: null });
    try {
      const data = await authApi.login(payload);
      get().setSession(data);
      return data;
    } catch (err) {
      set({ status: "error", error: err.message });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
    set({ user: null, token: null });
  },

  refresh: async () => {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    if (!refreshToken) throw new Error("No refresh token");
    const { token } = await authApi.refresh(refreshToken);
    localStorage.setItem(TOKEN_KEY, token);
    set({ token });
    return token;
  },
}));
