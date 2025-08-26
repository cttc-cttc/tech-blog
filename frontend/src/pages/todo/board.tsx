import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Todo } from "./todo-list";
import dayjs from "dayjs";

const typeName: Record<string, string> = {
  todo: "할 일",
  inprogress: "진행 중",
  done: "완료",
};

interface BoardProps {
  type: string;
  todos: Todo[];
}

const renderTodo = (todos: Todo[]) => {
  if (todos.length === 0) return <p className="text-center">작성된 업무가 없습니다</p>;

  return (
    <>
      {todos.map(todo => (
        <Card key={todo.id}>
          <CardHeader>
            <CardTitle>{todo.title}</CardTitle>
            <CardDescription>{dayjs(todo.createdAt).format("YYYY-MM-DD HH:mm")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{todo.content}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default function Board({ type, todos }: BoardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        {type === "todo" && <div className="animate-pulse w-3 h-3 rounded-full bg-red-500"></div>}
        {type === "inprogress" && (
          <div className="animate-pulse w-3 h-3 rounded-full bg-amber-500"></div>
        )}
        {type === "done" && <div className="animate-pulse w-3 h-3 rounded-full bg-green-500"></div>}
        <p className="text-foreground font-semibold leading-none">{typeName[type]}</p>
      </div>
      {renderTodo(todos)}
    </div>
  );
}
