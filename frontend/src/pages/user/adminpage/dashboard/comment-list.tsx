import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CustomSkeleton } from "@/pages/components/shadcn-custom/custom-skeleton";
import type { CommentProps } from "@/pages/components/utils/common-interfaces";
import { pathTextMap } from "@/pages/components/utils/post-utils";
import PaginationComponent from "@/pages/posting/pagination-component";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function CommentList() {
  const [commentList, setCommentList] = useState<CommentProps[]>([]);
  const [page, setPage] = useState(0); // 댓글 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [loading, setLoading] = useState(false);

  // 페이지 바뀔 때마다 랜더링
  const fetchCommentList = useCallback(() => {
    setLoading(true);
    const query: Record<string, string | number> = {
      page,
      size: 5,
    };

    axios
      .get("/api/auth/commentList", { params: query })
      .then(res => {
        console.log(res.data);
        setCommentList(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error("댓글 불러오기 실패: ", err))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    fetchCommentList();
  }, [fetchCommentList]);

  if (loading) return <CustomSkeleton type="comments" />;

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="mb-2">댓글 리스트</CardTitle>
          <CardDescription>블로그에 작성된 모든 댓글을 표시합니다.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          {commentList.map(comment => (
            <Card key={comment.id} className="mb-2">
              <CardContent>
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-muted-foreground">{comment.writer}</p>
                    {/* 작성 시간 필요 */}
                    <div className="flex text-muted-foreground items-center">
                      <p className="text-sm!">{pathTextMap[comment.category1]}</p>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <p className="text-sm!">{pathTextMap[comment.category2]}</p>
                    </div>
                  </div>
                  <p className="line-clamp-2">{comment.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* 페이지네이션 */}
      <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
}
