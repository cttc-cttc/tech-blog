// src/api/axios.ts
import axios from "axios";
import { useUserStore } from "@/store";

// 공통 팝업(팀 공용 컴포넌트) – 실제 파일명과 맞춤
let openPopup: ((msg: string) => void) | null = null;
try {
  const mod = require("@/components/common/CommonPopup"); // ← 실제 파일명
  openPopup = mod.openPopup as (msg: string) => void;
} catch {
  // fallback: 아래 sonner 사용
}
import { toast } from "sonner";

// 토큰 만료 처리 중복 방지
let isHandling401 = false;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

// ===== 요청 인터셉터: 토큰 만료 사전 차단 + Authorization 부착 =====
axiosInstance.interceptors.request.use(config => {
  const { token, tokenExp, removeUserData } = useUserStore.getState();

  if (token) {
    // 만료(ms) 시각 존재하면 사전 차단
    if (tokenExp && Date.now() >= tokenExp) {
      const msg = "세션이 만료되었습니다. 다시 로그인해 주세요.";

      // Alert 창 띄우기
      alert(msg);

      removeUserData();

      // 홈 화면으로 이동
      setTimeout(() => {
        window.location.href = "/";
      }, 300);

      return Promise.reject(new axios.Cancel("Token expired"));
    }

    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== 응답 인터셉터: 401 공통 처리(+기존 예외 로직 유지) =====
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const status = error?.response?.status;
    const data = error?.response?.data as
      | { status?: number; error?: string; message?: string }
      | undefined;

    const url: string = error.config?.url || "";
    const isLoginRequest = url.includes("/auth/signin");
    const isProfileRequest = url.includes("/profile");

    // ✅ 백엔드 표준 에러 바디 호환: error 필드가 없으면 기본값 TOKEN_INVALID
    const code =
      (typeof data?.error === "string" && data.error) || (status === 401 ? "TOKEN_INVALID" : "");

    const isExpired = status === 401 && code === "TOKEN_EXPIRED";
    const isInvalid = status === 401 && code === "TOKEN_INVALID";

    if ((isExpired || isInvalid) && !isHandling401 && !isLoginRequest && !isProfileRequest) {
      isHandling401 = true;

      // 한국어 UI 문구 (만료/무효 구분)
      const msg = isExpired
        ? "세션이 만료되었습니다. 다시 로그인해 주세요."
        : "인증에 실패했습니다. 다시 로그인해 주세요.";

      useUserStore.getState().removeUserData();

      setTimeout(() => {
        window.location.href = "/";
        setTimeout(() => {
          isHandling401 = false;
        }, 700);
      }, 700);

      return Promise.reject(error);
    }

    // 400/409 등은 각 페이지에서 details를 읽어 FormMessage로 처리
    return Promise.reject(error);
  }
);
