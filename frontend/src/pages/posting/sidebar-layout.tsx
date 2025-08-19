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

export default function SidebarLayout() {
  const { role } = useAuthStore();
  const { category1, category2 } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const isStateCreate = currentPath.includes("create");
  const isStateUpdate = currentPath.includes("update");

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
          <Outlet /> {/* 라우터에서 PostsList / PostDetail 알아서 들어옴 */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
