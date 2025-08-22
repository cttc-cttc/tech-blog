import { BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import type { CustomSkeletonProps, PostProps } from "./common-interfaces";
import dayjs from "dayjs";
import { toast } from "sonner";
import PostCard from "@/pages/posting/post-card";
import { CustomSkeleton } from "../shadcn-custom/custom-skeleton";

//? 게시글 posting 관련 공통 함수

/**
 * post base url을 반환해주는 함수
 * ex) currentPath가 /posts/it/html/update/40 이면 /posts/it/html 로 반환
 * ex) currentPath가 /posts/jp/n2tan/43 이면 /posts/jp/n2tan 으로 반환
 * ex) currentPath가 /posts/it 이면 /posts/it 그대로 반환
 * @param currentPath
 * @returns
 */
export const getPostBasePath = (currentPath: string): string => {
  const segments = currentPath.split("/").filter(Boolean); // 빈 문자열 제거

  let resultSegments: string[];

  if (segments.length >= 3) {
    resultSegments = segments.slice(0, 3); // 0,1,2 index까지만 사용
  } else {
    resultSegments = segments; // 길이 2면 그대로 사용
  }

  return "/" + resultSegments.join("/");
};

/**
 * 경로의 마지막 segment를 반환
 * @param currentPath
 * @returns
 */
export const getPathLastSegment = (currentPath: string): string => {
  return currentPath.split("/").filter(Boolean).pop() ?? "";
};

/**
 * 사이드 바 레이아웃 헤더에서 경로의 마지막 세그먼트를 웹 페이지용 이름으로 반환하는 함수
 */
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

/**
 * 사이드 바 레이아웃 헤더에서 경로의 마지막 세그먼트를 카테고리 아이디로 반환하는 함수
 */
export const categoryIdMap: Record<string, number> = {
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

/**
 * 게시글 리스트 출력
 * @param postsList
 * @returns
 */
export const renderPostsList = (
  { type }: CustomSkeletonProps,
  postsList: PostProps[],
  loading: boolean
) => {
  if (loading) {
    return (
      <div className="flex justify-center mt-4">
        <CustomSkeleton type={type} />
      </div>
    );
  }

  if (postsList.length === 0) {
    return <p className="p-4 text-center mt-4">게시글이 없습니다.</p>;
  }

  return (
    <>
      {/* 게시글 리스트 */}
      {postsList.map((post, index) => (
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
                    <BreadcrumbPage className="text-muted-foreground">
                      {post.nameParent}
                    </BreadcrumbPage>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator className="hidden md:block" />

                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage className="text-muted-foreground">
                      {post.nameChild}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </div>
              </div>
              <CardDescription>
                {dayjs(post.createdAt).format("YYYY-MM-DD")} · {post.writer}
                {post.updatedAt && dayjs(post.updatedAt).format(" (수정: YYYY-MM-DD)")}
              </CardDescription>
            </CardHeader>
            {/* <Separator /> */}
            <CardContent className="py-2">
              <PostCard post={post} />
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
};

/**
 * 제목, 카테고리, 글 내용 공백 체크
 * @param value input 폼의 value
 * @param message toast에 띄울 메시지
 * @returns value값이 공백이면 false, 공백이 아니면 true
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

/**
 * 정규표현식으로 HTML 내 이미지 추출
 * @param html 에디터의 전체 html 내용
 * @returns 에디터 내용 중 이미지에 대한 html 내용
 */
export const extractImgUrl = (html: string) => {
  const imageUrls =
    html.match(/<img[^>]+src="([^">]+)"/g)?.map((tag: string) => {
      const match = tag.match(/src="([^">]+)"/);
      return match?.[1];
    }) || [];

  return imageUrls;
};
