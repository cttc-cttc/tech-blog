import { useParams } from "react-router-dom";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import axios from "axios";
import { useComments, type CommentType } from "./useComments";
import { useAuthStore } from "@/pages/components/utils/useAuthStore";
import { CustomSkeleton } from "@/pages/components/shadcn-custom/custom-skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function CommentSection() {
  const { postId } = useParams();
  const { comments, fetchComments, loading } = useComments(Number(postId));
  const { token, userId, nickName } = useAuthStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 댓글 등록
  const handleAdd = (parentId: number | null, content: string) => {
    axios
      .post("/api/comments", {
        postId: Number(postId),
        userId,
        nickName,
        content,
        parentId,
      })
      .then(fetchComments);
  };

  // 댓글 수정
  const handleEdit = (id: number, content: string) => {
    const payload = { userId, content };
    axios
      .put(`/api/comments/${id}`, payload, {
        headers: { "Contents-Type": "application/json" },
      })
      .then(fetchComments)
      .catch(error => console.error("댓글 수정 실패:", error));
  };

  // 댓글 삭제 다이얼로그
  const handleDelete = (id: number) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  // 댓글 삭제
  const deleteComment = async () => {
    if (selectedId == null) return;

    /*
        첫 번째 인자: URL (/comments/{id})
        두 번째 인자: body (null로 보냄)
        세 번째 인자: axios config, 여기서 params를 넣으면 쿼리스트링으로 변환됨 → ?userId=...
    */
    await axios
      .patch(`/api/comments/${selectedId}`, null, {
        params: { userId },
      })
      .then(() => {
        setDialogOpen(false);
        setSelectedId(null);
        fetchComments();
      })
      .catch(error => console.error("댓글 삭제 실패:", error));
  };

  // 댓글 전체 갯수
  const getTotalComments = (comments: CommentType[]): number =>
    comments.reduce((count, c) => count + 1 + (c.children ? getTotalComments(c.children) : 0), 0);

  if (loading) return <CustomSkeleton type="comments" />;

  return (
    <>
      <div>
        <h3 className="font-bold text-lg mb-4">댓글 {getTotalComments(comments)}</h3>

        {token && <CommentForm onSubmit={(content: string) => handleAdd(null, content)} />}

        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            userId={userId ?? ""}
            onReply={(parentId, content) => handleAdd(parentId, content)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* shadcn AlertDialog는 컴포넌트화 못 함 */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {/* <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>해당 댓글을 삭제 하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>삭제된 댓글은 복구할 수 없습니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer">취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteComment}
              className="text-white bg-destructive dark:bg-destructive/50 hover:cursor-pointer hover:bg-destructive/70 dark:hover:bg-destructive/70"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
