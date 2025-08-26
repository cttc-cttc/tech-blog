import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Todo } from "./todo-list";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";

const typeName: Record<string, string> = {
  todo: "할 일",
  inprogress: "진행 중",
  done: "완료",
};

interface BoardProps {
  type: string;
  todos: Todo[];
  onSuccess: () => void;
}

export default function Board({ type, todos, onSuccess }: BoardProps) {
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [openDialog, setOpenDialog] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const renderTodo = (todos: Todo[]) => {
    if (todos.length === 0) return <p className="text-center">작성된 업무가 없습니다</p>;

    return (
      <>
        {todos.map(todo => (
          <Card
            key={todo.id}
            onDoubleClick={() => handleDoubleClick(todo)}
            className="hover:cursor-pointer"
          >
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

  const handleDoubleClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setOpenDialog(true);
  };

  // 업무 내용 수정
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTodo) return;

    const formData = new FormData(e.currentTarget);
    const todoData = {
      id: selectedTodo.id,
      title: formData.get("todoName"),
      content: formData.get("todoContent"),
    };

    axios
      .put("/api/todo", todoData)
      .then(() => {
        if (nameRef.current) nameRef.current.value = "";
        if (contentRef.current) contentRef.current.value = "";
        alert("업무 내용이 수정 되었습니다.");
        onSuccess(); // post 성공 시 부모에게 알려줌
      })
      .catch(err => console.error("todo 수정 실패: ", err));
  };

  // 업무 카드 삭제
  const handleDelete = () => {
    if (!selectedTodo) return;

    axios
      .delete(`/api/todo/${selectedTodo.id}`)
      .then(() => {
        alert("해당 업무가 삭제 되었습니다.");
        onSuccess();
      })
      .catch(err => console.error("todo 삭제 실패 ", err));
  };

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

      {/* 수정 Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px] shadow-[0_0_5px_var(--muted-foreground)]">
          <DialogHeader>
            <DialogTitle className="mb-1">업무 수정</DialogTitle>
            <DialogDescription>내용을 수정하고 저장하세요.</DialogDescription>
          </DialogHeader>
          {selectedTodo && (
            <form onSubmit={handleUpdate} className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="todoName">업무 제목</Label>
                  <Input
                    ref={nameRef}
                    id="todoName"
                    name="todoName"
                    type="text"
                    defaultValue={selectedTodo.title}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="todoContent">작업 내용</Label>
                  <Input
                    ref={contentRef}
                    id="todoContent"
                    name="todoContent"
                    type="text"
                    defaultValue={selectedTodo.content}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  className="hover:cursor-pointer"
                  variant="outline"
                  onClick={() => setOpenDialog(false)}
                >
                  취소
                </Button>
                <Button type="submit" className="hover:cursor-pointer">
                  수정
                </Button>
                <Button
                  type="button"
                  className="hover:cursor-pointer"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  삭제
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
