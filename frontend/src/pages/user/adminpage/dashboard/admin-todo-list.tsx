import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CustomSkeleton } from "@/pages/components/shadcn-custom/custom-skeleton";
import type { Todo } from "@/pages/components/utils/common-interfaces";
import PaginationComponent from "@/pages/posting/pagination-component";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function AdminTodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [page, setPage] = useState(0); // todo 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [loading, setLoading] = useState(false);

  // 페이지 바뀔 때마다 랜더링
  const fetchCommentList = useCallback(() => {
    setLoading(true);
    const query: Record<string, string | number> = {
      page,
      size: 5,
    };

    axios
      .get("/api/auth/todoList", { params: query })
      .then(res => {
        // console.log(res.data);
        setTodoList(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error("댓글 불러오기 실패: ", err))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    fetchCommentList();
  }, [fetchCommentList]);

  if (loading) return <CustomSkeleton type="comments" />;

  if (todoList.length === 0)
    return (
      <p className="flex h-full items-center justify-center bg-muted/50 rounded-xl">
        작성된 Todo가 없습니다.
      </p>
    );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="mb-1">Todo List</CardTitle>
        <CardDescription>Todo List 페이지의 모든 할 일을 표시합니다.</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="px-4 divide-y">
        {todoList.map(todo => (
          <Link
            key={todo.id}
            to={`/todo?highlightId=${todo.id}`}
            className="block p-3 hover:bg-accent/90 transition-colors duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-1 items-center">
                <p>{todo.title}</p>
                <p className="text-muted-foreground">·</p>
                <p className="text-sm! text-muted-foreground">{dayjs(todo.createdAt).fromNow()}</p>
              </div>
              <div className="flex gap-2 items-center">
                {todo.state === "TODO_TODO" && (
                  <>
                    <div className="animate-pulse w-3 h-3 rounded-full bg-red-500"></div>
                    <p className="text-sm! text-muted-foreground">할 일</p>
                  </>
                )}
                {todo.state === "TODO_IN_PROGRESS" && (
                  <>
                    <div className="animate-pulse w-3 h-3 rounded-full bg-amber-500"></div>
                    <p className="text-sm! text-muted-foreground">진행 중</p>
                  </>
                )}
                {todo.state === "TODO_DONE" && (
                  <>
                    <div className="animate-pulse w-3 h-3 rounded-full bg-green-500"></div>
                    <p className="text-sm! text-muted-foreground">완료</p>
                  </>
                )}
              </div>
            </div>
            <p className="line-clamp-2 text-muted-foreground">{todo.content}</p>
          </Link>
        ))}
      </CardContent>
      <CardFooter>
        {/* 페이지네이션 */}
        <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} pageSize={3} />
      </CardFooter>
    </Card>
  );
}
