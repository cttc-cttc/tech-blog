//? 게시글 posting 관련 공통 함수

import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import type { PostProps } from "./common-interfaces";
import dayjs from "dayjs";
import { toast } from "sonner";

// currentPath가 /posts/it/css 이면 ["posts", "it", "css"] 로 반환해주는 함수
export const getPathSegment = (path: string): string[] => {
  return path.split("/").filter(Boolean);
};

// currentPath가 /posts/it/html이면 "html", /posts/jp이면 "jp"를 반환하는 함수
export const getPathLastSegment = (path: string): string | undefined => {
  return path.split("/").filter(Boolean).pop();
};

// currentPath가 /posts/it/html이면 "it", /posts/jp이면 "jp"를 반환하는 함수
export const getPathFirstSegment = (path: string): string | undefined => {
  return path.split("/").filter(Boolean).at(1);
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

/**
 * 게시글 리스트 출력
 * @param postsList
 * @returns
 */
export const renderPostsList = (postsList: PostProps[]) => {
  return (
    <>
      {postsList.map((post, index) => (
        <>
          <Link
            to={`/posts/${post.urlNameParent}/${post.urlNameChild}/${post.id}`}
            key={index}
            className="w-full max-w-7xl mb-4"
          >
            <Card className="hover:shadow-lg transition-shadow duration-200 dark:hover:shadow-gray-800 rounded-md">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-2xl">{post.title}</CardTitle>

                  {/* 카테고리 표시 */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink>{post.nameParent}</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator className="hidden md:block" />

                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink>{post.nameChild}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </div>
                </div>
                <CardDescription>
                  {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")} · {post.writer}
                </CardDescription>
              </CardHeader>
              {/* <Separator /> */}
              <CardContent className="line-clamp-3 break-words text-muted-foreground py-4">
                {post.contents.substring(0, 150)}...
              </CardContent>
            </Card>
          </Link>
        </>
      ))}
    </>
  );
};

/**
 * 제목, 카테고리, 글 내용 공백 체크
 * @param value
 * @param message
 * @returns
 */
export const validatePostField = (value: string | number | null, message: string) => {
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
