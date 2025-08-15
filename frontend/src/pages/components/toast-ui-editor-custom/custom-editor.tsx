import { Editor } from "@toast-ui/react-editor";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { Editor as EditorType } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import axios from "axios";

interface CustomEditorProps {
  onChange: (value: string) => void;
}

export interface CustomEditorRef {
  /** 에디터 내용을 마크다운 문자열로 반환 */
  getMarkdown: () => string | undefined;

  /** 에디터 내용을 HTML 문자열로 반환 */
  getHTML: () => string | undefined;

  /** Toast UI Editor 인스턴스 자체를 반환 */
  getEditorInstance: () => EditorType | null;

  /** 에디터에 포커스 이동 */
  focus: () => void;
}

const CustomEditor = forwardRef<CustomEditorRef, CustomEditorProps>(({ onChange }, ref) => {
  const editorRef = useRef<EditorType>(null);

  const handleChange = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown();
    onChange(markdown || "");
  };

  // 부모 ref에 공개할 메서드 정의
  useImperativeHandle(ref, () => ({
    getMarkdown: () => editorRef.current?.getInstance().getMarkdown(),
    getHTML: () => editorRef.current?.getInstance().getHTML(),
    getEditorInstance: () => editorRef.current,
    focus: () => editorRef.current?.getInstance().focus(),
  }));

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

  return (
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
      onChange={handleChange}
    />
  );
});

export default CustomEditor;
