import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { PostProps } from "../components/utils/common-interfaces";

export default function PostsDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState<PostProps>();

  useEffect(() => {
    axios
      .get(`/api/posts/${postId}`)
      .then(res => setPost(res.data))
      .catch(err => console.error("Error fetching post:", err));
  }, [postId]);

  if (!post) return <p className="p-4">로딩 중...</p>;

  return (
    <div className="max-w-4xl p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")} · {post.writer}
      </p>
      <div className="text-gray-800 whitespace-pre-wrap">{post.contents}</div>
    </div>
  );
}
