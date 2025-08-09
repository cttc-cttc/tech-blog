export interface PostProps {
  id: number;
  title: string;
  writer: string;
  contents: string;
  categoryId: number;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
}
