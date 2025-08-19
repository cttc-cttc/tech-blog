import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CustomEditor, {
  type CustomEditorRef,
} from "../components/toast-ui-editor-custom/custom-editor";
import { useAuthStore } from "../components/utils/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import CategorySelector from "./category-selector";
import { categoryIdMap, extractImgUrl, validatePostField } from "../components/utils/post-utils";
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

export default function PostsCreate() {
  const { category2 } = useParams();
  const editorRef = useRef<CustomEditorRef>(null);
  const { nickName } = useAuthStore();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const categoryIdRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 카테고리 설정
    if (category2) setCategoryId(categoryIdMap[category2]);
  }, [category2]);

  // 글 등록 전 유효성 체크
  const handleValidate = async () => {
    if (!validatePostField(title, "제목을 입력해주세요.")) {
      titleRef.current?.focus();
      return;
    }

    if (!validatePostField(categoryId, "카테고리를 선택해주세요.")) {
      categoryIdRef.current?.focus();
      return;
    }

    if (!validatePostField(contents, "내용을 입력해주세요.")) {
      editorRef.current?.focus();
      return;
    }

    setDialogOpen(true);
  };

  // 글 등록 처리
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
      categoryId: categoryId,
      images: imageUrls,
    };

    try {
      const response = await axios.post("/api/posts", payload, {
        headers: { "Contents-Type": "application/json" },
      });
      // console.log(response.data);
      const { urlNameParent, urlNameChild, id } = response.data;
      navigate(`/posts/${urlNameParent}/${urlNameChild}/${id}`);
    } catch (err) {
      console.error("등록 실패: ", err);
    }
  };

  // 이전 페이지 버튼
  const prevPage = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl flex flex-col gap-1 z-0">
      {/* 제목 */}
      <div className="flex justify-between items-center pb-1">
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

      {/* 카테고리 */}
      <CategorySelector onSelect={setCategoryId} selectedId={categoryId} />

      {/* 에디터 */}
      <CustomEditor onChange={setContents} ref={editorRef} />

      {/* 버튼 */}
      <div className="py-6 flex w-full justify-end gap-2">
        <Button variant="outline" className="hover:cursor-pointer" onClick={prevPage}>
          취소
        </Button>
        <Button variant="default" className="hover:cursor-pointer" onClick={handleValidate}>
          등록
        </Button>
      </div>

      {/* shadcn AlertDialog는 컴포넌트화 못 함 */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {/* <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>게시글을 등록 하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>작성된 내용으로 글을 등록합니다.</AlertDialogDescription>
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
