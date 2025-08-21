import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../components/utils/useAuthStore";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CustomSkeleton } from "../components/shadcn-custom/custom-skeleton";

type CommentType = {
  id: number;
  writer: string;
  content: string;
  children?: CommentType[];
};

// const dummyComments: CommentType[] = [
//   {
//     id: 1,
//     author: "Alice",
//     content: "첫 번째 댓글",
//     children: [{ id: 2, author: "Bob", content: "Alice에게 대댓글!" }],
//   },
//   {
//     id: 3,
//     author: "Charlie",
//     content: "두 번째 댓글",
//   },
// ];

export default function CommentSection() {
  const { postId } = useParams();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [newContent, setNewContent] = useState("");
  const [newReplyContent, setNewReplyContent] = useState("");
  const { token, userId, nickName } = useAuthStore();

  // 댓글 불러오기
  const fetchComment = useCallback(() => {
    axios
      .get(`/api/comments/${postId}`)
      .then(res => {
        setComments(res.data);
      })
      .catch(err => console.error("댓글 불러오기 에러", err));
  }, [postId]);

  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  if (!comments) return <CustomSkeleton type="comments" />;

  /// 댓글/답글 등록
  const handleSubmit = (parentId?: number) => {
    // parentId가 있으면 답글, 없으면 댓글
    const content = parentId ? newReplyContent : newContent;
    if (!content.trim()) return;

    // const newComment: CommentType = {
    //   id: Date.now(),
    //   author: nickName ?? "",
    //   content: content,
    // };

    axios
      .post("/api/comments", {
        postId: Number(postId),
        userId: Number(userId),
        nickName: nickName,
        content: content,
        parentId: parentId ?? null,
      })
      .then(() => {
        fetchComment();

        if (parentId) {
          // 답글 등록
          // setComments(prev =>
          //   prev.map(c =>
          //     c.id === parentId ? { ...c, children: [...(c.children || []), newComment] } : c
          //   )
          // );
          setNewReplyContent(""); // 답글 입력창 초기화
          setReplyTo(null);
        } else {
          // 댓글 등록
          // setComments(prev => [...prev, newComment]);
          setNewContent(""); // 댓글 입력창 초기화
        }
      })
      .catch(err => console.error("댓글/답글 등록 에러", err));
  };

  // 댓글 랜더링
  const renderComment = (comment: CommentType, depth = 0) => (
    <div key={comment.id} className={`mt-4 mb-4 ${depth === 1 ? "ml-8" : ""}`}>
      <Card className="p-3">
        <CardContent className="flex gap-3 p-0">
          <div className="flex-1">
            <p className="font-semibold mb-2">{comment.writer}</p>
            <p className="whitespace-pre-wrap">{comment.content}</p>
            {depth < 1 && token && (
              <div className="flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-2 hover:cursor-pointer font-normal"
                  onClick={() => setReplyTo(comment.id)}
                >
                  답글 달기
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 답글 입력창 */}
      {replyTo === comment.id && depth < 1 && (
        <div className="flex flex-col items-end ml-8 mt-2">
          <Textarea
            value={newReplyContent}
            onChange={e => setNewReplyContent(e.target.value)}
            placeholder="답글을 입력하세요..."
            className="mb-2"
          />
          <Button
            className="hover:cursor-pointer"
            disabled={!newReplyContent.trim()}
            onClick={() => handleSubmit(comment.id)}
          >
            답글 등록
          </Button>
        </div>
      )}

      {/* 답글 렌더링 */}
      {comment.children?.map(child => renderComment(child, depth + 1))}
    </div>
  );

  // 모든 댓글 갯수
  const getTotalComments = (comments: CommentType[]): number => {
    return comments.reduce((count, comment) => {
      // 1: 현재 댓글 + children(대댓글) 수
      return count + 1 + (comment.children ? getTotalComments(comment.children) : 0);
    }, 0);
  };

  return (
    <div>
      <h3 className="font-bold text-lg mb-4">댓글 {getTotalComments(comments)}</h3>

      {/* 댓글 입력 */}
      {token && (
        <div className="flex flex-col items-end mb-6">
          <Textarea
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="mb-2"
          />
          <Button
            className="hover:cursor-pointer"
            disabled={!newContent.trim()}
            onClick={() => handleSubmit()}
          >
            댓글 등록
          </Button>
        </div>
      )}

      {/* 댓글 리스트 */}
      {comments.map(comment => renderComment(comment))}
    </div>
  );
}
