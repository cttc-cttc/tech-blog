import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
import { HomeAspectRatio } from "@/pages/components/shadcn-custom/home-aspect-ratio";
import { getParentCategory, getPathName, pathStrMap } from "@/pages/components/utils/post-utils";
import type { PostProps } from "@/pages/components/utils/common-interfaces";
import axios from "axios";
import dayjs from "dayjs";

export default function HomeMain() {
  const [postsList, setPostsList] = useState<PostProps[]>([]);

  useEffect(() => {
    axios
      .get("api/posts-all")
      .then(res => setPostsList(res.data))
      .catch(err => console.error("Error fetching posts:", err));
  }, []);

  if (!postsList) return <p className="p-4">로딩 중...</p>;

  return (
    <main className="w-full">
      <div className="flex flex-col gap-5 items-center">
        <HomeAspectRatio />
        <div className="mb-8"></div>

        {postsList.map((post, index) => (
          <>
            <Link
              to={`/${getParentCategory(post.categoryId)}/${pathStrMap[post.categoryId]}/${post.id}`}
              key={index}
              className="w-full max-w-7xl mb-4"
            >
              <Card className="hover:shadow-lg transition-shadow duration-200 dark:hover:shadow-gray-800 rounded-md">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                    {/* 카테고리 표시 */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink>
                          {getPathName(getParentCategory(post.categoryId))}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink>{post.categoryName}</BreadcrumbLink>
                      </BreadcrumbItem>
                    </div>
                  </div>
                  <CardDescription>
                    {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")} · {post.writer}
                  </CardDescription>
                </CardHeader>
                {/* <Separator /> */}
                <CardContent className="line-clamp-3 break-words text-muted-foreground py-4">
                  {post.contents.substring(0, 150)}...
                </CardContent>
              </Card>
            </Link>
          </>
        ))}
      </div>
    </main>
  );
}
