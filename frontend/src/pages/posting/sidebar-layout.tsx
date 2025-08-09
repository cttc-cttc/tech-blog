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
import { Outlet, useLocation } from "react-router-dom";
import { getPathSegment, pathTextMap } from "../components/utils/post-utils";
import PostsList from "./postsList";

export default function SidebarLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const pathArray = getPathSegment(currentPath);

  return (
    <SidebarProvider className="min-h-[69vh]">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          {/* <SidebarTrigger className="-ml-1 hover:cursor-pointer" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" /> */}
          <Breadcrumb>
            <BreadcrumbList>
              {pathArray.length === 2 ? (
                <>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink>{pathTextMap[pathArray[0]]}</BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator className="hidden md:block" />

                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage>{pathTextMap[pathArray[1]]}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              ) : (
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink>{pathTextMap[pathArray[0]]}</BreadcrumbLink>
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
        <div className="flex flex-1 flex-col gap-4 p-4 mt-8">
          {pathArray.length >= 2 ? <Outlet /> : <PostsList />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
