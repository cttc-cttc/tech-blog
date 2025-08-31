import { AspectRatio } from "@/components/ui/aspect-ratio";
import ContributionGraph from "@/pages/home/contribution-graph";
import type { PostProps } from "../utils/common-interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomSkeleton } from "./custom-skeleton";

export function HomeAspectRatio() {
  const [postsList, setPostsList] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/contribution")
      .then(res => setPostsList(res.data))
      .catch(err => console.error("최근 1년 간 작성한 게시글 조회 실패", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CustomSkeleton type="posts" />;

  return (
    <div className="w-full">
      <AspectRatio ratio={16 / 5} className="bg-muted rounded-lg relative">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
        />

        <div className="absolute inset-0 flex flex-col">
          {/* 상단 제목, 그래프와 좌측 여백 동일하게 */}
          <div className="px-12 py-6">
            <p className="text-lg font-medium text-accent-foreground/70">
              게시글 포스팅 현황 (최근 1년)
            </p>
          </div>

          {/* 그래프 중앙 배치, 좌측 padding 맞춤 */}
          <div className="flex-1 flex justify-start items-center px-12 flex-wrap">
            <ContributionGraph posts={postsList} />
          </div>
        </div>
      </AspectRatio>
    </div>
  );
}
