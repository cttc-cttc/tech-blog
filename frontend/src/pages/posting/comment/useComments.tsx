import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export interface CommentType {
  id: number;
  userId: string;
  writer: string;
  content: string;
  children?: CommentType[];
}

export function useComments(postId: number) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(() => {
    setLoading(true);
    axios
      .get(`/api/comments/${postId}`)
      .then(res => setComments(res.data))
      .catch(err => console.error("댓글 불러오기 에러", err))
      .finally(() => setLoading(false));
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, fetchComments, loading };
}
