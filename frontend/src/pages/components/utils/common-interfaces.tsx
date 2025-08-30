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

// 유저 타입
export interface User {
  userId: string;
  nickName: string;
  email: string;
  role: string;
}

// skeleton 타입
export interface CustomSkeletonProps {
  type: "home" | "posts" | "comments";
}

// 댓글 타입
export interface CommentProps {
  id: number;
  userId: string;
  content: string;
  writer: string;
  postId: number;
  parentId: number;
  postTitle: string;
  category1: string;
  category2: string;
}
