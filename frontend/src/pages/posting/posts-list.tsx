import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import type { PostProps } from "../components/utils/common-interfaces";
import { renderPostsList } from "../components/utils/post-utils";
import axios from "axios";
import "./code-block.css";
import { usePostsStore } from "../components/utils/usePostsStore";

type OutletContextType = {
  searchPostsList: PostProps[];
};

export default function PostsList() {
  const { category1, category2 } = useParams();
  const [postsList, setPostsList] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchPostsList } = useOutletContext<OutletContextType>();
  const { isSearching } = usePostsStore();

  useEffect(() => {
    const params: Record<string, string> = {};
    if (category1) params.category1 = category1;
    if (category2) params.category2 = category2;

    axios
      .get("/api/posts", { params })
      .then(res => {
        // console.log(res.data);
        setPostsList(res.data);
      })
      .catch(err => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false));
  }, [category1, category2]);

  return (
    <div className="max-w-4xl flex flex-col gap-5">
      {renderPostsList(
        { type: "posts" },
        isSearching ? searchPostsList : postsList, // 검색을 한 상태이면 검색 결과를 보여줌
        loading
      )}
    </div>
  );
}
