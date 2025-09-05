import { create } from "zustand";
import type { User } from "@services/auth";
import {
  getToken, setToken, clearToken,
  getStoredUser, setStoredUser, clearStoredUser
} from "@lib/authStorage";

type AuthState = {
  user: User | null;
  token: string | null;
  setSession: (user: User, token: string) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
  hydrate: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,

  setSession: (user, token) => {
    setToken(token);
    setStoredUser(user);
    set({ user, token });
  },

  clearSession: () => {
    clearToken();
    clearStoredUser();
    set({ user: null, token: null });
  },

  isAuthenticated: () => !!get().token,

  hydrate: () => {
    const token = getToken();
    const user = getStoredUser() as User | null;
    set({ token: token ?? null, user: user ?? null });
  },
}));
