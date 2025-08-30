import { useEffect, useState } from "react";
import { useAuthStore } from "../components/utils/useAuthStore";
import TodoDialog from "./todo-dialog";
import axios from "axios";
import { CustomSkeleton } from "../components/shadcn-custom/custom-skeleton";
import DragBoard from "./drag-board";
import type { Todo } from "../components/utils/common-interfaces";
import { useSearchParams } from "react-router-dom";

export default function TodoList() {
  const { role } = useAuthStore();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  // 관리자 페이지에서 넘겨준 값 받기
  const highlightId = searchParams.get("highlightId");

  const fetchTodo = () => {
    setLoading(true);
    axios
      .get("/api/todo")
      .then(res => setTodos(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  // ✅ todos가 렌더링된 뒤 해당 todo로 스크롤
  useEffect(() => {
    if (highlightId && todos.length > 0) {
      const el = document.getElementById(`todo-${highlightId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add(
          "transition-colors",
          "duration-700",
          "ease-in-out",
          "bg-muted-foreground/30",
          "dark:bg-muted-foreground/30"
        );

        setTimeout(() => {
          el.classList.remove("bg-muted-foreground/30", "dark:bg-muted-foreground/30");
        }, 500);
      }
    }
  }, [highlightId, todos]);

  if (loading) return <CustomSkeleton type="posts" />;

  return (
    <div className="flex flex-col w-full max-w-7xl">
      <div className="flex justify-between">
        <p className="text-lg font-bold px-2 py-4">Todo List</p>
        {role === "ROLE_ADMIN" && (
          <div className="flex flex-col items-end justify-center text-muted-foreground pr-2">
            <p>업무 카드 더블 클릭으로 내용 수정/삭제</p>
            <p>업무 카드 드래그로 상태 변경</p>
          </div>
        )}
      </div>
      <hr className="border-muted-foreground/50 mb-4" />
      <DragBoard todos={todos} setTodos={setTodos} onSuccess={fetchTodo} />

      {role === "ROLE_ADMIN" && (
        <>
          <div className="flex justify-end px-4 pt-4">
            <TodoDialog onSuccess={fetchTodo} />
          </div>
        </>
      )}
    </div>
  );
}
