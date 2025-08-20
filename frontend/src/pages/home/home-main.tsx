import React, { useEffect, useRef, useState } from "react";
import { HomeAspectRatio } from "@/pages/components/shadcn-custom/home-aspect-ratio";
import type { PostProps } from "@/pages/components/utils/common-interfaces";
import axios from "axios";
import { renderPostsList } from "@/pages/components/utils/post-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PaginationComponent from "../posting/pagination-component";

export default function HomeMain() {
  const [postsList, setPostsList] = useState<PostProps[]>([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<"all" | "it" | "jp">("all");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios
      .get("api/posts/page", {
        params: { page, size: 10 }, // 백엔드에 page, size 전달
      })
      .then(res => {
        setPostsList(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false));
  }, [page]);

  // 버튼을 map으로 랜더링하기 위한 배열
  const filters: { type: "all" | "it" | "jp"; label: string }[] = [
    { type: "all", label: "전체" },
    { type: "it", label: "IT" },
    { type: "jp", label: "일본어" },
  ];

  // 카테고리에 따른 게시글 리스트 select
  const fetchPostsFilter = async (category: typeof filterType) => {
    setFilterType(category);
    if (searchRef.current) searchRef.current.value = "";

    try {
      const res = await axios.get(
        `/api/posts/filter${category !== "all" ? `?category=${category}` : ""}`
      );
      setPostsList(res.data);
    } catch (err) {
      console.error("카테고리로 조회 실패", err);
    }
  };

  // 검색어 입력에 따른 게시글 리스트 select
  const fetchPostsKeyword = async (keyword: string) => {
    try {
      const res = await axios.get(`/api/posts/keyword?keyword=${keyword}`);
      setPostsList(res.data);
    } catch (err) {
      console.log("검색어로 조회 실패", err);
    }
  };

  // 검색어 입력 후 Enter
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setFilterType("all");
      fetchPostsKeyword(e.currentTarget.value.trim());
    }
  };

  return (
    <main className="w-full max-w-7xl mt-8">
      <div className="flex flex-col gap-5 items-center">
        <HomeAspectRatio />

        {/* 필터링 버튼, 검색란 랜더링 */}
        <div className="mt-4 flex w-full justify-end gap-2">
          {filters.map((filter, index) => (
            <React.Fragment key={index}>
              <Button
                variant="link"
                className={`hover:cursor-pointer text-muted-foreground ${
                  filterType === filter.type
                    ? "text-foreground underline underline-offset-4 font-bold"
                    : ""
                }`}
                onClick={() => fetchPostsFilter(filter.type)}
              >
                {filter.label}
              </Button>

              {index !== filters.length - 1 && ( // 마지막 버튼 뒤엔 separator 넣지 않기
                <div className="flex ">
                  <Separator orientation="vertical" className="h-4! self-center bg-foreground/20" />
                </div>
              )}
            </React.Fragment>
          ))}

          <div className="relative w-full max-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              ref={searchRef}
              type="text"
              placeholder="제목으로 검색 + Enter"
              className="pl-10 pr-4 py-2 rounded-2xl border border-input bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onKeyDown={handleSearchKeyDown}
            />
          </div>
        </div>

        {/* 리스트 랜더링 */}
        {renderPostsList({ type: "home" }, postsList, loading)}

        {/* 페이지네이션 */}
        <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </main>
  );
}
