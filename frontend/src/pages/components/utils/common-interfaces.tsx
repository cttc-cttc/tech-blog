//? 공통적으로 사용되는 타입 정의

// 게시글 타입
export interface PostProps {
  id: number;
  title: string;
  writer: string;
  contents: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
  // parentCategoryId: number | null;
  urlNameParent: string | null;
  urlNameChild: string;
  nameParent: string | null;
  nameChild: string;
}

// skeleton 타입
export interface CustomSkeletonProps {
  type: "home" | "posts" | "comments";
}
