import { useEffect, useState } from "react";
import { useAuthStore } from "../components/utils/useAuthStore";
import TodoDialog from "./todo-dialog";
import axios from "axios";
import { CustomSkeleton } from "../components/shadcn-custom/custom-skeleton";
import DragBoard from "./drag-board";

export interface Todo {
  id: number;
  title: string;
  content: string;
  state: "TODO_TODO" | "TODO_IN_PROGRESS" | "TODO_DONE";
  createdAt: Date;
}

export default function TodoList() {
  const { role } = useAuthStore();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

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

  if (loading) return <CustomSkeleton type="posts" />;

  return (
    <div className="flex flex-col w-full max-w-7xl">
      <div className="flex justify-between">
        <p className="text-lg font-bold px-2 py-4">Todo List</p>
        <div className="flex flex-col items-end justify-center text-muted-foreground pr-2">
          <p>업무 카드 더블 클릭으로 내용 수정/삭제</p>
          <p>업무 카드 드래그로 상태 변경</p>
        </div>
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
