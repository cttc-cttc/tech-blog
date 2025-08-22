import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  initialValue?: string;
}

export function CommentForm({ onSubmit, onCancel, initialValue = "" }: CommentFormProps) {
  const [content, setContent] = useState(initialValue);

  return (
    <div className="flex flex-col items-end">
      <Textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        className="mb-2 h-20"
      />
      <div className="flex gap-2">
        {onCancel && (
          <Button className="hover:cursor-pointer" size="sm" variant="outline" onClick={onCancel}>
            취소
          </Button>
        )}
        <Button
          className="hover:cursor-pointer"
          size="sm"
          disabled={!content.trim()}
          onClick={() => {
            onSubmit(content);
            setContent("");
          }}
        >
          등록
        </Button>
      </div>
    </div>
  );
}
