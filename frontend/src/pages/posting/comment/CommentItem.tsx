import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CommentForm } from "./CommentForm";
import type { CommentType } from "./useComments";
import { useAuthStore } from "@/pages/components/utils/useAuthStore";
import dayjs from "dayjs";

interface CommentItemProps {
  comment: CommentType;
  userId: string;
  onReply: (commentId: number, content: string) => void;
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
  depth?: number;
}

export function CommentItem({
  comment,
  userId,
  onReply,
  onEdit,
  onDelete,
  depth = 0,
}: CommentItemProps) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const { token } = useAuthStore();

  return (
    <div className="mt-4 mb-4">
      <Card className="p-3">
        <CardContent className="px-2">
          <div className="flex justify-between">
            <p className="font-semibold mb-2">{comment.writer}</p>
            <div className="flex">
              <p className="text-muted-foreground mb-2">
                {dayjs(comment.createdAt).format("YYYY-MM-DD")}
              </p>
              {comment.updatedAt && (
                <p className="text-muted-foreground mb-2 ml-2">
                  {dayjs(comment.updatedAt).format("(수정: YYYY-MM-DD)")}
                </p>
              )}
            </div>
          </div>

          {editing ? (
            <CommentForm
              initialValue={comment.content}
              onCancel={() => setEditing(false)}
              onSubmit={content => {
                onEdit(comment.id, content);
                setEditing(false);
              }}
            />
          ) : (
            <p className="whitespace-pre-wrap">{comment.content}</p>
          )}

          <div className="flex justify-end gap-2 mt-2">
            {token && !editing && depth === 0 && (
              <Button
                className="hover:cursor-pointer"
                size="sm"
                variant="outline"
                onClick={() => setReplying(!replying)}
              >
                답글 달기
              </Button>
            )}
            {comment.userId === userId && !editing && (
              <>
                <Button className="hover:cursor-pointer" size="sm" onClick={() => setEditing(true)}>
                  수정
                </Button>
                <Button
                  className="hover:cursor-pointer hover:bg-destructive/70 dark:hover:bg-destructive/70"
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(comment.id)}
                >
                  삭제
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {replying && depth === 0 && (
        <div className="ml-8 mt-2">
          <CommentForm
            onCancel={() => setReplying(false)}
            onSubmit={content => {
              onReply(comment.id, content);
              setReplying(false);
            }}
          />
        </div>
      )}

      {comment.children?.map(child => (
        <div className="ml-8" key={child.id}>
          <CommentItem
            comment={child}
            userId={userId}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
            depth={depth + 1} // 답글에는 depth + 1 전달
          />
        </div>
      ))}
    </div>
  );
}
