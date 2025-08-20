import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import type { PostProps } from "../components/utils/common-interfaces";
import { renderPostsList } from "../components/utils/post-utils";
import axios from "axios";
import "./code-block.css";
import { usePostsStore } from "../components/utils/usePostsStore";
import PaginationComponent from "./pagination-component";

type OutletContextType = {
  searchPostsList: PostProps[];
};

export default function PostsList() {
  const { category1, category2 } = useParams();
  const [postsList, setPostsList] = useState<PostProps[]>([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [loading, setLoading] = useState(true);
  const { searchPostsList } = useOutletContext<OutletContextType>();
  const { isSearching } = usePostsStore();

  useEffect(() => {
    const query: Record<string, string | number> = {
      page,
      size: 10,
    };
    if (category1) query.category1 = category1;
    if (category2) query.category2 = category2;

    axios
      .get("/api/posts/page", { params: query })
      .then(res => {
        // console.log(res.data);
        setPostsList(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false));
  }, [category1, category2, page]);

  return (
    <div className="max-w-4xl flex flex-col gap-5">
      {renderPostsList(
        { type: "posts" },
        isSearching ? searchPostsList : postsList, // 검색을 한 상태이면 검색 결과를 보여줌
        loading
      )}

      {/* 페이지네이션 */}
      <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
