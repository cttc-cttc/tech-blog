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
  searchPage: number;
  setSearchPage: React.Dispatch<React.SetStateAction<number>>;
  totalSearchPages: number;
  searchLoading: boolean;
};

export default function PostsList() {
  const { searchPostsList, searchPage, setSearchPage, totalSearchPages, searchLoading } =
    useOutletContext<OutletContextType>();

  const { category1, category2 } = useParams();
  const [postsList, setPostsList] = useState<PostProps[]>([]);
  const [page, setPage] = useState(0); // 일반 게시글용 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [loading, setLoading] = useState(true);
  const { isSearching } = usePostsStore();

  // 카테고리 바뀔 때 page 초기화
  useEffect(() => {
    setPage(0);
  }, [category1, category2]);

  // 페이지가 바뀔 때마다 postsList를 새로 불러옴
  useEffect(() => {
    setLoading(true);
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
        isSearching ? searchLoading : loading
      )}

      {/* 페이지네이션 */}
      <PaginationComponent
        page={isSearching ? searchPage : page}
        setPage={isSearching ? setSearchPage : setPage}
        totalPages={isSearching ? totalSearchPages : totalPages}
      />
    </div>
  );
}
