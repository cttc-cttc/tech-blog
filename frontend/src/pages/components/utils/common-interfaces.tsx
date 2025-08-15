// 게시글 타입
export interface PostProps {
  id: number;
  title: string;
  writer: string;
  contents: string;
  createdAt: Date;
  updatedAt: Date;
  urlNameParent: string | null;
  urlNameChild: string;
  nameParent: string | null;
  nameChild: string;
}
