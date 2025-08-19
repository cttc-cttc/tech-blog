import { useRef, useState } from "react";
import CustomEditor, {
  type CustomEditorRef,
} from "../components/toast-ui-editor-custom/custom-editor";
import { extractImgUrl, validatePostField } from "../components/utils/post-utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../components/utils/useAuthStore";
import axios from "axios";
import { Input } from "@/components/ui/input";

export default function IntroCreate() {
  const editorRef = useRef<CustomEditorRef>(null);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const { nickName } = useAuthStore();
  const titleRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 글 등록
  const handleSubmit = async () => {
    if (!validatePostField(contents, "내용을 입력해주세요.")) {
      editorRef.current?.focus();
      return;
    }

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

    await axios
      .post("/api/intro", payload, {
        headers: { "Contents-Type": "application/json" },
      })
      .then(response => {
        console.log("등록 성공:", response.data);
        navigate("/intro");
      })
      .catch(error => console.error("등록 실패:", error));
  };

  // 이전 페이지로 돌아가기
  const prevPage = () => {
    navigate("/intro");
  };

  return (
    <>
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
        <CustomEditor onChange={setContents} ref={editorRef} />
        <div className="py-6 flex w-full justify-end gap-2">
          <Button className="hover:cursor-pointer" variant="outline" onClick={prevPage}>
            취소
          </Button>
          <Button className="hover:cursor-pointer" variant="default" onClick={handleSubmit}>
            등록
          </Button>
        </div>
      </div>
    </>
  );
}
