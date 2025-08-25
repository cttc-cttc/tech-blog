import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CustomSkeleton } from "@/pages/components/shadcn-custom/custom-skeleton";
import { useAuthStore } from "@/pages/components/utils/useAuthStore";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CommentProps {
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

export default function MyComments() {
  const { userId } = useAuthStore();
  const [commentList, setCommentList] = useState<CommentProps[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyComment = useCallback(() => {
    setLoading(true);
    axios
      .get("/api/user/myComment", {
        params: { userId },
      })
      .then(res => {
        console.log(res.data);
        setCommentList(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [userId]);

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
    </div>
  );
}
