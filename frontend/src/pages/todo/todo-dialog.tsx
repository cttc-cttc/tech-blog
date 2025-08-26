import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "../components/utils/useAuthStore";
import axios from "axios";
import { useRef } from "react";

export default function TodoDialog({ onSuccess }: { onSuccess: () => void }) {
  const { userId } = useAuthStore();
  const nameRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const todoData = {
      writer: userId,
      title: formData.get("todoName"),
      content: formData.get("todoContent"),
    };

    axios
      .post("/api/todo", todoData)
      .then(() => {
        if (nameRef.current) nameRef.current.value = "";
        if (contentRef.current) contentRef.current.value = "";
        alert("할 일이 추가 되었습니다.");
        onSuccess(); // post 성공 시 부모에게 알려줌
      })
      .catch(err => console.error("todo 등록 실패: ", err));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="hover:cursor-pointer">
          할 일 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] shadow-[0_0_5px_var(--muted-foreground)]">
        <form onSubmit={e => handleSubmit(e)}>
          <DialogHeader>
            <DialogTitle className="mb-1">할 일을 추가하세요</DialogTitle>
            <DialogDescription>
              작업이 필요한 일을 작은 단위로 구분해 놓으면, 앞으로 해야 할 일이 명확해집니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 mt-8 mb-6">
            <div className="grid gap-3">
              <Label htmlFor="todoName">할 일</Label>
              <Input
                ref={nameRef}
                id="todoName"
                name="todoName"
                type="text"
                placeholder="ex) 카테고리 편집기 만들기"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="todoContent">작업 내용</Label>
              <Input ref={contentRef} id="todoContent" name="todoContent" type="text" required />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="hover:cursor-pointer">
                취소
              </Button>
            </DialogClose>
            <Button type="submit" className="hover:cursor-pointer">
              작성
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
