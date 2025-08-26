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
      <p className="text-lg font-bold px-2 py-4">Todo List</p>
      <hr className="border-muted-foreground/50 mb-4" />
      <main className="grid grid-cols-3 divide-x divide-muted-foreground/50 w-full min-h-[52vh]">
        <div className="p-4">
          <Board type="todo" todos={todos.filter(t => t.state === "TODO_TODO")} />
        </div>
        <div className="p-4">
          <Board type="inprogress" todos={todos.filter(t => t.state === "TODO_IN_PROGRESS")} />
        </div>
        <div className="p-4">
          <Board type="done" todos={todos.filter(t => t.state === "TODO_DONE")} />
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
