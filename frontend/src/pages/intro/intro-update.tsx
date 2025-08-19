import axios from "axios";
import { useEffect, useRef, useState } from "react";
import type { CustomEditorRef } from "../components/toast-ui-editor-custom/custom-editor";
import { extractImgUrl, validatePostField } from "../components/utils/post-utils";
import { useAuthStore } from "../components/utils/useAuthStore";
import { useNavigate } from "react-router-dom";
import CustomEditor from "../components/toast-ui-editor-custom/custom-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function IntroUpdate() {
  const titleRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const editorRef = useRef<CustomEditorRef>(null);
  const [loaded, setLoaded] = useState(false);
  const { nickName } = useAuthStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  // 페이지 첫 로드 시 처리
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/intro");
      setTitle(data.title ?? "");
      setContents(data.contents ?? "");
      setLoaded(true);
    })();
  }, []);

  // 글 수정 전 유효성 체크
  const handleValidate = async () => {
    if (!validatePostField(title, "제목을 입력해주세요.")) {
      titleRef.current?.focus();
      return;
    }

    if (!validatePostField(contents, "내용을 입력해주세요.")) {
      editorRef.current?.focus();
      return;
    }

    setDialogOpen(true);
  };

  // 글 수정 처리
  const handleSubmit = async () => {
    // 정규표현식으로 HTML 내 이미지 추출
    // 이후 서버에 함께 전송해서 어떤 이미지가 실제로 쓰였는지 DB에 반영
    const html = editorRef.current?.getHTML() ?? "";
    // console.log(html);
    const imageUrls = extractImgUrl(html);

    // 백엔드의 @RequestBody 안에 다 포함시켜야 됨 (json 형식)
    const payload = {
      title,
      contents,
      writer: nickName,
      images: imageUrls,
    };

    try {
      const response = await axios.put("/api/intro", payload, {
        headers: { "Contents-Type": "application/json" },
      });
      console.log(response.data);
      navigate("/intro");
    } catch (err) {
      console.error("수정 실패: ", err);
    }
  };

  // 이전 페이지로 돌아가기
  const prevPage = () => {
    navigate("/intro");
  };

  return (
    <div className="container max-w-4xl mt-10">
      {/* 제목 */}
      <div className="flex justify-between items-center pb-1 mb-2">
        <Input
          ref={titleRef}
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="
                      w-full
                      border
                      border-foreground/15
                      dark:border-foreground/70
                      bg-background
                      text-foreground
                      rounded-sm
                      px-3
                      py-2
                      focus:outline-none
                      focus:ring-2
                      focus:ring-ring
                    "
        />
      </div>

      {/* 에디터 */}
      {loaded && <CustomEditor onChange={setContents} ref={editorRef} initialValue={contents} />}
      <div className="py-6 flex w-full justify-end gap-2">
        <Button className="hover:cursor-pointer" variant="outline" onClick={prevPage}>
          취소
        </Button>
        <Button className="hover:cursor-pointer" variant="default" onClick={handleValidate}>
          수정
        </Button>
      </div>

      {/* shadcn AlertDialog는 컴포넌트화 못 함 */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {/* <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>소개글을 수정 하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>작성된 내용으로 글을 수정합니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer">취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} className="hover:cursor-pointer">
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
