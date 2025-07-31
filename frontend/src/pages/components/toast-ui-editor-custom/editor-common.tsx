import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import type { Editor as EditorType } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { Button } from "@/components/ui/button";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "./toast-editor-dark.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditorWithViewer: React.FC = () => {
  const editorRef = useRef<EditorType>(null);
  const formData = new FormData();
  const navigate = useNavigate();

  const handleSave = async () => {
    const markdown = editorRef.current?.getInstance().getMarkdown();

    formData.append("contents", markdown);
    formData.append("del_flag", "0");
    formData.append("title", "test");
    formData.append("writer", "admin");

    // axios.post("/api/intro-insert", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
    try {
      await axios.post("/api/intro-insert", formData);
      // const response = await axios.post("/api/intro-insert", formData);
      // console.log("posting successful:", response.data);
      navigate("/intro");
    } catch (error) {
      console.error("posting failed:", error);
    }
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

      <Button className="hover:cursor-pointer" variant="outline" onClick={handleSave}>
        저장
      </Button>
    </div>
  );
};

export default EditorWithViewer;
