import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { IconDashboard, IconListDetails, IconMessage, IconUser } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

const dataAdmin = {
  sidebarName: "Admin page",
  navMain: [
    {
      title: "대시보드",
      url: "/auth/adminpage",
      icon: IconDashboard,
      isActive: false,
    },
    {
      title: "카테고리 관리",
      url: "/auth/adminpage/category",
      icon: IconListDetails,
      isActive: false,
    },
  ],
};

const dataUser = {
  sidebarName: "User page",
  navMain: [
    {
      title: "내 정보",
      url: "/auth/mypage",
      icon: IconUser,
      isActive: false,
    },
    {
      title: "내가 쓴 댓글",
      url: "/auth/mypage/comments",
      icon: IconMessage,
      isActive: false,
    },
  ],
};

export function MemberAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar {...props} className="mt-[104px]">
      <SidebarContent>
        <SidebarGroup>
          {currentPath.includes("adminpage") ? (
            <SidebarGroupLabel>{dataAdmin.sidebarName}</SidebarGroupLabel>
          ) : (
            <SidebarGroupLabel>{dataUser.sidebarName}</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarContent>
                {currentPath.includes("adminpage") ? (
                  // 관리자 페이지 sidebar 메뉴 활성화
                  <>
                    {currentPath.includes("category")
                      ? ((dataAdmin.navMain[0].isActive = false),
                        (dataAdmin.navMain[1].isActive = true))
                      : ((dataAdmin.navMain[0].isActive = true),
                        (dataAdmin.navMain[1].isActive = false))}
                    <NavMain items={dataAdmin.navMain} />
                  </>
                ) : (
                  // 마이페이지 sidebar 메뉴 활성화
                  <>
                    {currentPath.includes("comments")
                      ? ((dataUser.navMain[0].isActive = false),
                        (dataUser.navMain[1].isActive = true))
                      : ((dataUser.navMain[0].isActive = true),
                        (dataUser.navMain[1].isActive = false))}
                    <NavMain items={dataUser.navMain} />
                  </>
                )}
              </SidebarContent>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
