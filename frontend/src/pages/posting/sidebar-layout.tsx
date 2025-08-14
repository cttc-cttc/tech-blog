import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { getPathSegment, pathTextMap } from "../components/utils/post-utils";
import PostsList from "./posts-list";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../components/utils/useAuthStore";

export default function SidebarLayout() {
  const { role } = useAuthStore();
  const location = useLocation();
  const currentPath = location.pathname;

  const pathArray = getPathSegment(currentPath);

  // 사이드 바 레이아웃 헤더 조건부 렌더링
  const renderHeader = () => {
    if (pathArray.length >= 2) {
      return (
        <>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink>{pathTextMap[pathArray[1]]}</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="hidden md:block" />

          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbPage>{pathTextMap[pathArray[2]]}</BreadcrumbPage>
          </BreadcrumbItem>
        </>
      );
    }

    return (
      <BreadcrumbItem className="hidden md:block">
        <BreadcrumbLink>{pathTextMap[pathArray[1]]}</BreadcrumbLink>
      </BreadcrumbItem>
    );
  };

  // 관리자일 경우 글쓰기 && 카테고리가 최상단이 아닐 경우 버튼 표시
  const renderWriteButton = () => {
    // /posts/it/html 과 같은 경우에만 보임
    if (role === "ROLE_ADMIN" && pathArray.length === 3) {
      return (
        <Link to={`${currentPath}/create`}>
          <Button variant="secondary" className="hover:cursor-pointer">
            글쓰기
          </Button>
        </Link>
      );
    }
  };

  return (
    <SidebarProvider className="min-h-[69vh]">
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
          <div className="flex items-center">{renderWriteButton()}</div>
        </header>
        {/* <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div> */}
        <div className="flex flex-1 flex-col gap-4 p-4 mt-20">
          {pathArray.length >= 3 ? <Outlet /> : <PostsList />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
