import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import type { Editor as EditorType } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "./toast-editor-dark.css";
import axios from "axios";
import { toast } from "sonner";

const CustomEditorInsert: React.FC = () => {
  const editorRef = useRef<EditorType>(null);
  const formData = new FormData();
  const navigate = useNavigate();

  // 저장 버튼
  const handleSave = async () => {
    if (editorRef.current) {
      const markdown = editorRef.current.getInstance().getMarkdown();
      if (!markdown) {
        toast.warning("내용을 입력해주세요.", {
          // description: "빈 내용은 등록할 수 없습니다.",
          action: {
            label: "확인",
            onClick: () => toast.dismiss(),
          },
        });
        return;
      }

      // 정규표현식으로 HTML 내 이미지 추출
      // 이후 서버에 함께 전송해서 어떤 이미지가 실제로 쓰였는지 DB에 반영
      const html = editorRef.current.getInstance().getHTML();
      // console.log(html);
      const imageUrls =
        html.match(/<img[^>]+src="([^">]+)"/g)?.map((tag: string) => {
          const match = tag.match(/src="([^">]+)"/);
          return match?.[1];
        }) || [];

      formData.append("contents", markdown);
      formData.append("del_flag", "0");
      formData.append("title", "test");
      formData.append("writer", "admin");
      formData.append("images", imageUrls);

      try {
        await axios.post("/api/intro-insert", formData);
        // console.log("posting successful:", response.data);
        navigate("/intro");
      } catch (error) {
        console.error("posting failed:", error);
      }
    }
  };

  // 이미지 업로드 hook 설정
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current
        .getInstance()
        .addHook(
          "addImageBlobHook",
          async (blob: File, callback: (url: string, altText: string) => void) => {
            try {
              const formData = new FormData();
              formData.append("image", blob);

              const response = await axios.post("/api/uploadImg", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

              // console.log(response.data.url);
              const imageUrl = response.data.url; // 서버에서 URL 반환
              callback(imageUrl, blob.name); // 이 URL이 에디터에 삽입됨
            } catch (err) {
              console.error("이미지 업로드 실패:", err);
            }
          }
        );
    }
  }, []);

  // 이전 페이지 버튼
  const prevPage = () => {
    navigate("/intro");
  };

  return (
    <div className="edit_wrap dark:dark">
      <Editor
        ref={editorRef}
        initialValue=""
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        hideModeSwitch={true}
        language="ko-KR"
        plugins={[colorSyntax]}
      />

      <div className="py-6 flex w-full justify-end">
        <Button className="hover:cursor-pointer mr-2" variant="outline" onClick={prevPage}>
          취소
        </Button>
        <Button className="hover:cursor-pointer" variant="outline" onClick={handleSave}>
          저장
        </Button>
      </div>
    </div>
  );
};

export default CustomEditorInsert;
