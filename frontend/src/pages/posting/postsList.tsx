import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import type { PostProps } from "../components/utils/common-interfaces";
import {
  getPathFirstSegment,
  getPathLastSegment,
  getPathName,
  pathIdMap,
  pathStrMap,
} from "../components/utils/post-utils";
// import { Separator } from "@/components/ui/separator";
import axios from "axios";
import dayjs from "dayjs";

export default function PostsList() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [postsList, setPostsList] = useState<PostProps[]>([]);
  const firstPathSegment = getPathFirstSegment(currentPath);
  const pathName = getPathName(firstPathSegment ?? "");

  useEffect(() => {
    const lastPath = getPathLastSegment(currentPath);
    const lastPathId = pathIdMap[lastPath ?? "it"]; // lastPath가 undefined라면 "it"라는 값을 사용

    axios
      .get("/api/posts", {
        params: {
          categoryId: lastPathId,
        },
      })
      .then(res => setPostsList(res.data))
      .catch(err => console.error("Error fetching posts:", err));
  }, [currentPath]);

  return (
    <>
      {postsList.map((post, index) => (
        <>
          <Link
            to={`/${firstPathSegment}/${pathStrMap[post.categoryId]}/${post.id}`}
            key={index}
            className="max-w-4xl mb-4"
          >
            <Card className="hover:shadow-lg transition-shadow duration-200 dark:hover:shadow-gray-800 rounded-md">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                  {/* 카테고리 표시 */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink>{pathName}</BreadcrumbLink>
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
    </>
  );
}
