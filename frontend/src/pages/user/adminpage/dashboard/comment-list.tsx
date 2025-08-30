import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CustomSkeleton } from "@/pages/components/shadcn-custom/custom-skeleton";
import type { CommentProps } from "@/pages/components/utils/common-interfaces";
import { pathTextMap } from "@/pages/components/utils/post-utils";
import PaginationComponent from "@/pages/posting/pagination-component";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.extend(relativeTime);
dayjs.locale("ko");
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        // console.log(res.data);
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

  if (commentList.length === 0)
    return <p className="flex h-full items-center justify-center">작성된 댓글이 없습니다.</p>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="mb-2">댓글</CardTitle>
        <CardDescription>블로그에 작성된 모든 댓글을 표시합니다.</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="px-4 divide-y">
        {commentList.map(comment => (
          <Link
            key={comment.id}
            to={`/posts/${comment.category1}/${comment.category2}/${comment.postId}`}
            className="block p-3 hover:bg-accent/90 transition-colors duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-1 items-center">
                <p className="text-muted-foreground">{comment.writer}</p>
                <p className="text-muted-foreground">·</p>
                <p className="text-sm! text-muted-foreground">
                  {dayjs(comment.createdAt).fromNow()}
                </p>
              </div>
              <div className="flex gap-1 text-muted-foreground items-center">
                <p className="text-sm!">{pathTextMap[comment.category1]}</p>
                <BreadcrumbSeparator className="hidden md:block" />
                <p className="text-sm!">{pathTextMap[comment.category2]}</p>
              </div>
            </div>
            <p className="line-clamp-2">{comment.content}</p>
          </Link>
        ))}
      </CardContent>
      <CardFooter>
        {/* 페이지네이션 */}
        <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} pageSize={3} />
      </CardFooter>
    </Card>
  );
}
