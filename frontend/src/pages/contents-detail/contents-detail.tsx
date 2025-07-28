import { useNavigate, useParams } from "react-router-dom";
import { posts } from "../components/mock/mock-data";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface POST {
  createdAt: string;
  postId: number;
  postsType: string;
  title: string;
  contents: string;
}

export default function ContentsDetail() {
  const { id } = useParams();
  const numId = Number(id);
  const [post, setPost] = useState<POST>();
  const navigate = useNavigate();

  useEffect(() => {
    const postData = posts.info.filter((detail: POST) => detail.postId === numId);
    setPost(postData[0]);
  }, [numId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-7xl">
      <h1>글 상세 페이지</h1>
      <div className="flex flex-col gap-2">
        <div className="bg-muted rounded-xl p-[20px]">{post.title}</div>
        <div className="bg-muted rounded-xl p-[20px]">{post.contents}</div>
        <div className="flex justify-end">
          <Button className="w-16 hover:cursor-pointer" variant="outline" onClick={handleGoBack}>
            back
          </Button>
        </div>
      </div>
    </div>
  );
}
