import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";

// 로그인 이후 페이지에서 유저 정보를 불러오는 커스텀 훅
export const useInitAuth = () => {
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuth({
        token,
        userId: localStorage.getItem("userId") ?? "",
        nickName: localStorage.getItem("nickName") ?? "",
        role: localStorage.getItem("role") ?? "",
      });
    }
  }, [setAuth]);
};
