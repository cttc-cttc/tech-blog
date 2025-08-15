import * as React from "react";
import { ChevronRight, File, FolderOpen } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  // SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  // SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { getPostBasePath } from "@/pages/components/utils/post-utils";

// This is sample data.
const data = {
  changes: [
    {
      file: "README.md",
      state: "M",
    },
    {
      file: "api/hello/route.ts",
      state: "U",
    },
    {
      file: "app/layout.tsx",
      state: "M",
    },
  ],
  tree: [
    ["app", ["api", ["hello", ["route.ts"]], "page.tsx", "layout.tsx", ["blog", ["page.tsx"]]]],
    ["components", ["ui", "button.tsx", "card.tsx"], "header.tsx", "footer.tsx"],
    ["lib", ["util.ts"]],
    ["public", "favicon.ico", "vercel.svg"],
    ".eslintrc.json",
    ".gitignore",
    "next.config.js",
    "tailwind.config.js",
    "package.json",
    "README.md",
  ],
  customTree: [
    [
      { name: "IT", page: "/posts/it" },
      { name: "HTML", page: "/posts/it/html" },
      { name: "CSS", page: "/posts/it/css" },
      { name: "JavaScript", page: "/posts/it/js" },
      { name: "React", page: "/posts/it/react" },
      { name: "DataBase", page: "/posts/it/db" },
      { name: "Java", page: "/posts/it/java" },
      { name: "Spring Boot", page: "/posts/it/sb" },
    ],
    [
      { name: "일본어", page: "/posts/jp" },
      { name: "JLPT N2 단어", page: "/posts/jp/n2tan" },
      { name: "JLPT N2 문법", page: "/posts/jp/n2gm" },
      { name: "존경어와 겸양어", page: "/posts/jp/reshum" },
      { name: "JLPT N1 단어", page: "/posts/jp/n1tan" },
      { name: "JLPT N1 문법", page: "/posts/jp/n1gm" },
    ],
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="mt-[104px]">
      <SidebarContent>
        {/* <SidebarGroup>
          <SidebarGroupLabel>Changes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.changes.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton>
                    <File />
                    {item.file}
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{item.state}</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
        <SidebarGroup>
          <SidebarGroupLabel>Posts</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.customTree.map((categoryList, index) => (
                <Tree key={index} categoryList={categoryList} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}

function Tree({ categoryList }: { categoryList: { name: string; page: string }[] }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const baseUrl = getPostBasePath(currentPath);

  // 첫 번째 요소는 부모 카테고리
  const [parentCategory, ...subCategories] = categoryList;
  const isParentActive = baseUrl === parentCategory.page;

  // 하위 카테고리가 없으면 단일 항목 렌더링
  if (subCategories.length === 0) {
    return (
      <SidebarMenuButton
        isActive={isParentActive}
        className="data-[active=true]:bg-sidebar-accent"
        asChild
      >
        <Link to={`${parentCategory.page}`}>
          <File />
          {parentCategory.name}
        </Link>
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        // defaultOpen={name === "components" || name === "ui"}
        defaultOpen={true}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            isActive={isParentActive}
            className="data-[active=true]:bg-sidebar-accent"
          >
            <ChevronRight className="transition-transform" />
            <FolderOpen />
            {parentCategory.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {subCategories.map(subCat => {
              const isSubActive = baseUrl === subCat.page;
              return (
                <SidebarMenuButton
                  key={subCat.page}
                  isActive={isSubActive}
                  className="data-[active=true]:bg-sidebar-accent"
                  asChild
                >
                  {/* 여기가 사이드 바 클릭하는 부분 */}
                  <Link to={`${subCat.page}`}>
                    <File />
                    {subCat.name}
                  </Link>
                </SidebarMenuButton>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
