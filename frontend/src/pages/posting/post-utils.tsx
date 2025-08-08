/**
 * Posting 관련 공통 함수 모듈
 */

// currentPath가 /it/css 이면 ["it", "css"] 로 반환해주는 함수
export const getPathSegment = (path: string): string[] => {
  return path.split("/").filter(Boolean);
};

// currentPath가 /it/html이면 "html", /jp이면 "jp"를 반환하는 함수
export const getPathLastSegment = (path: string): string | undefined => {
  return path.split("/").filter(Boolean).pop();
};
