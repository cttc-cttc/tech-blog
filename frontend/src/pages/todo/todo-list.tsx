import { useEffect, useState } from "react";
import { useAuthStore } from "../components/utils/useAuthStore";
import Board from "./board";
import TodoDialog from "./todo-dialog";
import axios from "axios";
import { CustomSkeleton } from "../components/shadcn-custom/custom-skeleton";

export interface Todo {
  id: number;
  title: string;
  content: string;
  state: string;
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
      <main className="grid grid-cols-3 divide-x divide-muted-foreground/50 w-full min-h-[52vh]">
        <div className="p-4">
          <Board
            type="todo"
            todos={todos.filter(t => t.state === "TODO_TODO")}
            onSuccess={fetchTodo}
          />
        </div>
        <div className="p-4">
          <Board
            type="inprogress"
            todos={todos.filter(t => t.state === "TODO_IN_PROGRESS")}
            onSuccess={fetchTodo}
          />
        </div>
        <div className="p-4">
          <Board
            type="done"
            todos={todos.filter(t => t.state === "TODO_DONE")}
            onSuccess={fetchTodo}
          />
        </div>
      </main>
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
