import { create } from "zustand";

//? 사용자 인증 정보를 관리하는 Zustand 스토어

interface AuthState {
  token: string | null;
  userId: string | null;
  nickName: string | null;
  role: string | null;
  setAuth: (data: { token: string; userId: string; nickName: string; role: string }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  token: localStorage.getItem("accessToken"),
  userId: localStorage.getItem("userId"),
  nickName: localStorage.getItem("nickName"),
  role: localStorage.getItem("role"),

  setAuth: ({ token, userId, nickName, role }) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("nickName", nickName);
    localStorage.setItem("role", role);
    set({ token, userId, nickName, role });
  },

  clearAuth: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("nickName");
    localStorage.removeItem("role");
    set({ token: null, userId: null, nickName: null, role: null });
  },
}));
