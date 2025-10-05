import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { pathTextMap } from "../components/utils/post-utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../components/utils/useAuthStore";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import type { PostProps } from "../components/utils/common-interfaces";
import { usePostsStore } from "../components/utils/usePostsStore";

export default function SidebarLayout() {
  const { role } = useAuthStore();
  const { category1, category2, postId } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const isStateDetail = !!postId; // 게시글 id 여부 -> 게시글 상세 페이지로 들어왔는지 아닌지
  const isStateCreate = currentPath.includes("create");
  const isStateUpdate = currentPath.includes("update");
  const [searchPostsList, setSearchPostsList] = useState<PostProps[]>([]);
  const { setSearchState, searchKeyword, setSearchKeyword } = usePostsStore();

  const [searchPage, setSearchPage] = useState(0); // 검색 페이징
  const [totalSearchPages, setTotalSearchPages] = useState(0); // 총 페이지 수
  const [searchLoading, setSearchLoading] = useState(true);

  // 검색창
  const searchBar = () => {
    // 게시글 상세 페이지, 글쓰기 페이지, 글 수정 페이지에 들어가면 검색창 숨김
    if (isStateDetail || isStateCreate || isStateUpdate) {
      return null;
    }

    return (
      <div className="relative w-full max-w-48">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          value={searchKeyword}
          placeholder="제목으로 검색 + Enter"
          className="pl-10 pr-4 py-2 rounded-2xl border border-input bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onChange={e => setSearchKeyword(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
      </div>
    );
  };

  // 검색어 입력 후 Enter
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchState(true);
      fetchPostsKeyword(searchKeyword.trim(), 0); // 검색 시작은 page 0
    }
  };

  // 검색어 입력에 따른 게시글 리스트 select
  const fetchPostsKeyword = async (keyword: string, page = 0) => {
    setSearchLoading(true);
    const query: Record<string, string | number> = {
      keyword,
      size: 10,
      page, // 페이지 번호 전달
    };
    if (category1) query.category1 = category1;
    if (category2) query.category2 = category2;

    try {
      const res = await axios.get("/api/posts/board/keyword", { params: query });
      setSearchPostsList(res.data.content);
      setTotalSearchPages(res.data.totalPages); // 총 페이지 저장
      setSearchPage(page); // 현재 페이지 저장
    } catch (err) {
      console.log("검색어로 조회 실패", err);
    } finally {
      setSearchLoading(false);
    }
  };

  // 사이드 바 레이아웃 헤더 조건부 렌더링
  const renderHeader = () => {
    if (category1 && category2) {
      return (
        <>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbPage className="text-muted-foreground">
              {pathTextMap[category1]}
            </BreadcrumbPage>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="hidden md:block" />

          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbPage>{pathTextMap[category2]}</BreadcrumbPage>
          </BreadcrumbItem>
        </>
      );
    }

    if (category1) {
      return (
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbPage className="text-muted-foreground">
            {pathTextMap[category1]}
          </BreadcrumbPage>
        </BreadcrumbItem>
      );
    }

    return null;
  };

  const renderWriteButton = () => {
    // 관리자일 경우 /posts/it/html 과 같이 하위 카테고리에서만,
    // 그리고 글쓰기, 글 수정 상태가 아닐 때 보임
    if (role === "ROLE_ADMIN" && category2 && !isStateCreate && !isStateUpdate) {
      return (
        <Link to={`/posts/${category1}/${category2}/create`}>
          <Button variant="secondary" className="hover:cursor-pointer">
            글쓰기
          </Button>
        </Link>
      );
    }
  };

  return (
    <SidebarProvider className="min-h-[65vh]">
      <AppSidebar />
      <SidebarInset>
        <header
          className="
            flex items-center justify-between
            h-16 px-6
            fixed w-full max-w-6xl left-1/5
            bg-background dark:bg-background
            border-b border-border
            z-10
          "
        >
          {/* <SidebarTrigger className="-ml-1 hover:cursor-pointer" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" /> */}
          <div className="flex items-center gap-3">
            <Breadcrumb>
              <BreadcrumbList className="text-sm text-muted-foreground">
                {renderHeader()}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex gap-4 items-center">
            {searchBar()}
            {renderWriteButton()}
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 mt-20">
          {/* 라우터에서 PostsList / PostDetail 알아서 들어옴 */}
          <Outlet
            context={{
              searchPostsList,
              searchPage,
              setSearchPage,
              totalSearchPages,
              searchLoading,
            }}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
