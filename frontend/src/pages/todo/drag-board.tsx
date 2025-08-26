import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { Todo } from "./todo-list";
import axios from "axios";
import dayjs from "dayjs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BoardProps {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  onSuccess: () => void;
}

export default function DragBoard({ todos, setTodos, onSuccess }: BoardProps) {
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [openDialog, setOpenDialog] = useState(false);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return; // drop 안된 경우
    if (destination.droppableId === source.droppableId) return; // 같은 위치

    // 드래그한 todo 찾기
    const movedTodo = todos.find(t => t.id === Number(draggableId));
    if (!movedTodo) return;

    // 상태 변경
    let newState: Todo["state"] = movedTodo.state;
    if (destination.droppableId === "TODO_TODO") newState = "TODO_TODO";
    if (destination.droppableId === "TODO_IN_PROGRESS") newState = "TODO_IN_PROGRESS";
    if (destination.droppableId === "TODO_DONE") newState = "TODO_DONE";

    // 리스트 갱신
    setTodos(prev => prev.map(t => (t.id === movedTodo.id ? { ...t, state: newState } : t)));

    // 👉 여기서 서버 API 호출해서 상태 변경 반영 가능
    axios
      .put(`/api/todo/${movedTodo.id}`, { state: newState })
      .then()
      .catch(err => console.error("상태 변경 실패 ", err));
  };

  const columns = [
    { id: "TODO_TODO", title: "할 일" },
    { id: "TODO_IN_PROGRESS", title: "진행 중" },
    { id: "TODO_DONE", title: "완료" },
  ];

  // 더블 클릭 시 다이얼로그 표시
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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 divide-x divide-muted-foreground/50 w-full min-h-[52vh]">
          {columns.map(col => (
            <Droppable droppableId={col.id} key={col.id}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-4 p-4 min-h-[100px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {col.id === "TODO_TODO" && (
                      <div className="animate-pulse w-3 h-3 rounded-full bg-red-500"></div>
                    )}
                    {col.id === "TODO_IN_PROGRESS" && (
                      <div className="animate-pulse w-3 h-3 rounded-full bg-amber-500"></div>
                    )}
                    {col.id === "TODO_DONE" && (
                      <div className="animate-pulse w-3 h-3 rounded-full bg-green-500"></div>
                    )}
                    <h2 className="text-foreground font-semibold leading-none">{col.title}</h2>
                  </div>
                  {todos.filter(t => t.state === col.id).length === 0 ? (
                    <p className="text-center">작성된 업무가 없습니다</p>
                  ) : (
                    todos
                      .filter(t => t.state === col.id)
                      .map((todo, index) => (
                        <Draggable
                          draggableId={String(todo.id)}
                          index={index}
                          key={String(todo.id)}
                        >
                          {provided => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onDoubleClick={() => handleDoubleClick(todo)}
                            >
                              <CardHeader>
                                <CardTitle>{todo.title}</CardTitle>
                                <CardDescription>
                                  {dayjs(todo.createdAt).format("YYYY-MM-DD HH:mm")}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p>{todo.content}</p>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

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
                  className="hover:cursor-pointer hover:bg-destructive/70 dark:hover:bg-destructive/70"
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
    </>
  );
}
