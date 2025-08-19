import { useEffect, useState } from "react";
import { HomeAspectRatio } from "@/pages/components/shadcn-custom/home-aspect-ratio";
import type { PostProps } from "@/pages/components/utils/common-interfaces";
import axios from "axios";
import { renderPostsList } from "@/pages/components/utils/post-utils";

export default function HomeMain() {
  const [postsList, setPostsList] = useState<PostProps[]>([]);

  useEffect(() => {
    axios
      .get("api/posts")
      .then(res => setPostsList(res.data))
      .catch(err => console.error("Error fetching posts:", err));
  }, []);

  if (!postsList) return <p className="p-4">로딩 중...</p>;

  return (
    <main className="w-full mt-8">
      <div className="flex flex-col gap-5 items-center">
        <HomeAspectRatio />
        <div className="mb-8"></div>
        {renderPostsList(postsList)}
      </div>
    </main>
  );
}
