import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CustomSkeleton } from "@/pages/components/shadcn-custom/custom-skeleton";
import type { CommentProps } from "@/pages/components/utils/common-interfaces";
import { useAuthStore } from "@/pages/components/utils/useAuthStore";
import PaginationComponent from "@/pages/posting/pagination-component";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyComments() {
  const { userId } = useAuthStore();
  const [commentList, setCommentList] = useState<CommentProps[]>([]);
  const [page, setPage] = useState(0); // 댓글 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [loading, setLoading] = useState(false);

  // 페이지 바뀔 때마다 랜더링
  const fetchMyComment = useCallback(() => {
    setLoading(true);
    const query: Record<string, string | number> = {
      page,
      size: 10,
    };
    if (userId) query.userId = userId;

    axios
      .get("/api/user/myComment", { params: query })
      .then(res => {
        console.log(res.data);
        setCommentList(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [userId, page]);

  useEffect(() => {
    fetchMyComment();
  }, [fetchMyComment]);

  if (loading) return <CustomSkeleton type="comments" />;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl self-baseline ml-8">
      {commentList.map(comment => (
        <Link to={`/posts/${comment.category1}/${comment.category2}/${comment.postId}`}>
          <Card key={comment.id} className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium flex justify-between">
                <p>{comment.content}</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground/80">작성자: {comment.writer}</p>
              <Separator className="my-2" />
              <p className="text-xs text-muted-foreground font-bold">게시글: {comment.postTitle}</p>
            </CardContent>
          </Card>
        </Link>
      ))}

      {/* 페이지네이션 */}
      <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
