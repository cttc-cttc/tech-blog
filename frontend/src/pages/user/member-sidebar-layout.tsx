import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { getPathLastSegment } from "@/pages/components/utils/post-utils";
import { MemberAppSidebar } from "./member-app-sidebar";

const nameConvert: Record<string, string> = {
  adminpage: "대시보드",
  category: "카테고리 관리",
  mypage: "내 정보",
  updateInfo: "내 정보 변경",
  comments: "내가 쓴 댓글",
};

export default function MemberSidebarLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const renderHeader = (root: string) => {
    return (
      <Breadcrumb>
        <BreadcrumbList className="text-sm text-muted-foreground">
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbPage className="text-muted-foreground">{root}</BreadcrumbPage>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="hidden md:block" />

          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbPage>{nameConvert[getPathLastSegment(currentPath)]}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  return (
    <SidebarProvider className="min-h-[65vh]">
      <MemberAppSidebar />
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
          <div className="flex items-center gap-3">
            {currentPath.includes("adminpage") ? (
              <>{renderHeader("관리페이지")}</>
            ) : (
              <>{renderHeader("마이페이지")}</>
            )}
          </div>

          <div className="flex gap-4 items-center"></div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 mt-20">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
