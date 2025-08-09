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

// currentPath가 /it/html이면 "it", /jp이면 "jp"를 반환하는 함수
export const getPathFirstSegment = (path: string): string | undefined => {
  return path.split("/").filter(Boolean).shift();
};

export const getPathName = (path: string): string | undefined => {
  if (path === "it") return "IT";
  if (path === "jp") return "일본어";
};

export const pathTextMap: Record<string, string> = {
  it: "IT",
  html: "HTML",
  css: "CSS",
  js: "JavaScript",
  react: "React",
  db: "DataBase",
  java: "Java",
  sb: "Spring Boot",
  jp: "일본어",
  n2tan: "JLPT N2 단어",
  n2gm: "JLPT N2 문법",
  reshum: "존경어와 겸양어",
  n1tan: "JLPT N1 단어",
  n1gm: "JLPT N1 문법",
};

// DB의 category 테이블 id값과 일치해야 함
export const pathIdMap: Record<string, number> = {
  it: 1,
  html: 3,
  css: 4,
  js: 5,
  react: 6,
  db: 7,
  java: 8,
  sb: 9,
  jp: 2,
  n2tan: 10,
  n2gm: 11,
  reshum: 12,
  n1tan: 13,
  n1gm: 14,
};

export const pathStrMap: Record<number, string> = {
  1: "it",
  3: "html",
  4: "css",
  5: "js",
  6: "react",
  7: "db",
  8: "java",
  9: "sb",
  2: "jp",
  10: "n2tan",
  11: "n2gm",
  12: "reshum",
  13: "n1tan",
  14: "n1gm",
};

export const getParentCategory = (childCategoryId: number): string => {
  // childCategoryId가 3, 4, 5, 6, 7, 8, 9인 경우
  if ([3, 4, 5, 6, 7, 8, 9].includes(childCategoryId)) {
    return pathStrMap[1]; // "it" 반환
  }

  // childCategoryId가 10, 11, 12, 13, 14인 경우
  if ([10, 11, 12, 13, 14].includes(childCategoryId)) {
    return pathStrMap[2]; // "jp" 반환
  }

  // 해당되지 않는 경우 빈 문자열 반환
  return "";
};
