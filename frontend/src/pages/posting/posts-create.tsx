import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import CustomEditor from "../components/toast-ui-editor-custom/custom-editor";
import { useAuthStore } from "../components/utils/useAuthStore";
import { useNavigate } from "react-router-dom";
import CategorySelector from "./category-selector";
import { validatePostField } from "../components/utils/post-utils";

export default function PostsCreate() {
  const { nickName } = useAuthStore();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const navigate = useNavigate();

  // 글 등록
  const handleSubmit = async () => {
    if (
      !validatePostField(title, "제목을 입력해주세요.") ||
      !validatePostField(categoryId, "카테고리를 선택해주세요.") ||
      !validatePostField(contents, "내용을 입력해주세요.")
    ) {
      return; // 하나라도 실패하면 함수 종료
    }

    const payload = { title, contents, writer: nickName, categoryId: categoryId };

    try {
      const response = await axios.post("/api/posts-create", payload, {
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
      <CategorySelector onSelect={setCategoryId} />

      {/* 에디터 */}
      <CustomEditor onChange={setContents} />

      {/* 버튼 */}
      <div className="py-6 flex w-full justify-end gap-2">
        <Button variant="outline" className="hover:cursor-pointer" onClick={prevPage}>
          취소
        </Button>
        <Button variant="default" className="hover:cursor-pointer" onClick={handleSubmit}>
          등록
        </Button>
      </div>
    </div>
  );
}
