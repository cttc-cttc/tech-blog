import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import { Editor as EditorType } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { Button } from "@/components/ui/button";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "./toast-editor-dark.css";
import axios from "axios";

const CustomEditorUpdate: React.FC = () => {
  const editorRef = useRef<EditorType>(null);
  const formData = new FormData();
  const navigate = useNavigate();
  const [contents, setContents] = useState("");
  const [postId, setPostId] = useState("");
  const [handled, setHandled] = useState(false);

  const pageLoad = async () => {
    try {
      const response = await axios.post("/api/intro-findLastOne");
      setPostId(response.data.post_id);
      setContents(response.data.contents);
      console.log("data load successful:", response.data);
    } catch (error) {
      console.error("data load failed:", error);
    }
  };

  useEffect(() => {
    pageLoad();
  }, []);

  // contents 상태가 설정된 후 에디터에 적용
  useEffect(() => {
    if (contents && !handled) {
      setHandled(true);

      if (editorRef.current) {
        const instance = editorRef.current.getInstance();
        instance.setMarkdown(contents);
      }
    }
  }, [contents, handled]);

  const handleSave = async () => {
    const markdown = editorRef.current?.getInstance().getMarkdown();

    formData.append("post_id_str", postId);
    formData.append("contents", markdown);
    formData.append("del_flag", "0");
    formData.append("title", "test");
    formData.append("writer", "admin");

    // axios.post("/api/intro-insert", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
    try {
      await axios.post("/api/intro-update", formData);
      // console.log("posting successful:", response.data);
      navigate("/intro");
    } catch (error) {
      console.error("posting failed:", error);
    }
  };

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

export default CustomEditorUpdate;
