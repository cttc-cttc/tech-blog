import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";

const pathMap: Record<string, string> = {
  it: "IT",
  html: "HTML",
  css: "CSS",
  js: "JavaScript",
  react: "React",
  db: "DataBase",
  java: "Java",
  sb: "Spring Boot",
  jp: "일본어",
  n2tan: "JLPT N2 단어",
  n2gm: "JLPT N2 문법",
  reshum: "존경어와 겸양어",
  n1tan: "JLPT N1 단어",
  n1gm: "JLPT N1 문법",
};

export default function SidebarLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const getPathSegment = (path: string): string[] => {
    return path.split("/").filter(Boolean);
  };

  const pathArray = getPathSegment(currentPath);

  return (
    <SidebarProvider className="min-h-[69vh]">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 hover:cursor-pointer" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {pathArray.length === 2 ? (
                <>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink>{pathMap[pathArray[0]]}</BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator className="hidden md:block" />

                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage>{pathMap[pathArray[1]]}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              ) : (
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink>{pathMap[pathArray[0]]}</BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {/* <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div> */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
