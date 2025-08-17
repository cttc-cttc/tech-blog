import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { PostProps } from "../components/utils/common-interfaces";

export default function PostCard({ post }: { post: PostProps }) {
  // 1. 첫 번째 이미지 추출 (정규식)
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = post.contents.match(imageRegex);

  const firstImage = match ? match[1] : null; // 이미지 url
  const textWithoutImage = post.contents.replace(imageRegex, ""); // 이미지 제거된 본문

  const stripHtml = (str: string) => str.replace(/<\/?[^>]+(>|$)/g, ""); // HTML 태그 제거

  return (
    <div className="flex items-start p-2 gap-4">
      {/* 왼쪽: 본문 미리보기 */}
      <div className="flex-1 line-clamp-5 text-muted-foreground">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {stripHtml(textWithoutImage).slice(0, 300)}
        </ReactMarkdown>
      </div>

      {/* 오른쪽: 첫 번째 이미지 썸네일 */}
      {firstImage && (
        <div className="w-48 h-32 flex-shrink-0">
          <img src={firstImage} alt="thumbnail" className="w-full h-full object-cover rounded-md" />
        </div>
      )}
    </div>
  );
}
