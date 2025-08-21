import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { PostProps } from "../components/utils/common-interfaces";
import CustomViewer from "../components/toast-ui-editor-custom/custom-viewer";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../components/utils/useAuthStore";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CommentSection from "./comment-section";
import { CustomSkeleton } from "../components/shadcn-custom/custom-skeleton";

export default function PostsDetail() {
  const { role } = useAuthStore();
  const { postId } = useParams();
  const [post, setPost] = useState<PostProps>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/posts/${postId}`)
      .then(res => setPost(res.data))
      .catch(err => console.error("Error fetching post:", err));
  }, [postId]);

  if (!post) return <CustomSkeleton type="posts" />;

  // 목록 페이지 버튼
  const navigateToList = () => {
    navigate(`/posts/${post.urlNameParent}/${post.urlNameChild}`);
  };

  // 수정 페이지 버튼
  const navigateUpdate = () => {
    navigate(`/posts/${post.urlNameParent}/${post.urlNameChild}/update/${postId}`);
  };

  // 삭제 버튼
  const handleDelete = () => {
    axios
      .patch(`/api/posts/${postId}`)
      .then(() => {
        navigateToList();
      })
      .catch(err => console.error("삭제 실패: ", err));
  };

  return (
    <div className="max-w-4xl p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {dayjs(post.createdAt).format("YYYY-MM-DD")} · {post.writer}
        {post.updatedAt && dayjs(post.updatedAt).format(" (수정: YYYY-MM-DD)")}
      </p>
      <CustomViewer contents={post.contents} />
      {/* <div className="text-gray-800 whitespace-pre-wrap">{post.contents}</div> */}
      <div className="flex justify-end py-6 gap-2">
        <Button variant="outline" className="hover:cursor-pointer" onClick={navigateToList}>
          목록
        </Button>
        {role === "ROLE_ADMIN" && (
          <>
            <Button variant="default" className="hover:cursor-pointer" onClick={navigateUpdate}>
              수정
            </Button>
            <Button
              variant="destructive"
              className="hover:cursor-pointer hover:bg-destructive/70 dark:hover:bg-destructive/70"
              onClick={() => setDialogOpen(true)}
            >
              삭제
            </Button>
          </>
        )}
      </div>

      {/* shadcn AlertDialog는 컴포넌트화 못 함 */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {/* <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>게시글을 삭제 하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>삭제된 글은 복구할 수 없습니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer">취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="text-white bg-destructive dark:bg-destructive/50 hover:cursor-pointer hover:bg-destructive/70 dark:hover:bg-destructive/70"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 댓글 영역 */}
      <CommentSection />
    </div>
  );
}
