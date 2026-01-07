import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../utils/types";

interface AuthStore {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setUser: (user) => {
        set({ user });
      },
      login: (token: string, user: User) => {
        set({ token, user, isAuthenticated: true });
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    { name: "auth-storage" }
  )
);
