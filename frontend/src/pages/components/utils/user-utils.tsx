import { toast } from "sonner";

//? 로그인, 비밀번호 찾기 등 유저 정보 처리에 사용되는 공통 함수

/**
 * 입력 폼 공백 체크
 * @param value input 폼의 value
 * @param message toast에 띄울 메시지
 * @returns value값이 공백이면 false, 공백이 아니면 true
 */
export const checkBlankInput = (value: string | null, message: string) => {
  if (!value) {
    toast.warning(message, {
      action: {
        label: "확인",
        onClick: () => toast.dismiss(),
      },
    });
    return false;
  }
  return true;
};

/**
 * 엔터 키 입력으로 폼 submit (유효성 검사 포함)
 * @param e 이벤트
 * @param handleFunction 유효성 검사 및 submit handler 함수
 * @param setMessage 메시지 초기화를 위한 useState set
 */
export const handleKeyDownEnter = (
  e: React.KeyboardEvent,
  handleFunction: () => void | Promise<void>,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  if (e.key === "Enter") {
    e.preventDefault(); // 엔터 기본 제출 방지
    setMessage("");
    handleFunction();
  }
};
