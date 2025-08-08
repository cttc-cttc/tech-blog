import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPathLastSegment } from "./post-utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";

// DB의 category 테이블 id값과 일치해야 함
const pathIdMap: Record<string, number> = {
  it: 1,
  html: 3,
  css: 4,
  js: 5,
  react: 6,
  db: 7,
  java: 8,
  sb: 9,
  jp: 2,
  n2tan: 10,
  n2gm: 11,
  reshum: 12,
  n1tan: 13,
  n1gm: 14,
};

interface PostProps {
  id: number;
  title: string;
  writer: string;
  contents: string;
  categoryId: number;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function PostsList() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [postsList, setPostsList] = useState<PostProps[]>([]);

  useEffect(() => {
    const lastPath = getPathLastSegment(currentPath);
    const lastPathId = pathIdMap[lastPath ?? "it"]; // lastPath가 undefined라면 "it"라는 값을 사용

    axios
      .get("/api/posts", {
        params: {
          categoryId: lastPathId,
        },
      })
      .then(res => {
        setPostsList(res.data);
      });
  }, [currentPath]);

  return (
    <>
      <h1>글 목록</h1>
      {postsList.map((post, index) => (
        <>
          <Card key={index}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")} · {post.writer}
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>{post.contents}...</CardContent>
          </Card>
        </>
      ))}
    </>
  );
}
