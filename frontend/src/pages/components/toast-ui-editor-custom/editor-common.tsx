import React, { useRef, useState } from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import type { Editor as EditorType } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { Button } from "@/components/ui/button";
// import { Editor, Viewer } from "@toast-ui/react-editor";
// import "@toast-ui/editor/toastui-editor.css";
// import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "./toast-editor-dark.css";
// import { useRef, useState } from "react";

// type EditorCommonProps = {
//   editorRef: React.RefObject<Editor> | null; // 추가
// };

// const EditorCommon = forwardRef(function EditorCommon(_, ref) {
//   return (
//     <div className="edit_wrap">
//       <Editor
//         initialValue=""
//         previewStyle="vertical"
//         height="600px"
//         initialEditType="wysiwyg"
//         useCommandShortcut={false}
//         language="ko-KR"
//         ref={ref}
//         // onChange={onChange}
//         plugins={[colorSyntax]}
//       />
//     </div>
//   );
// }

// export default EditorCommon;

const EditorWithViewer: React.FC = () => {
  const editorRef = useRef<EditorType>(null);
  const [content, setContent] = useState<string>(""); // viewer에 보여줄 내용

  const handleSave = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown();
    console.log(markdown);
    if (markdown !== undefined) {
      setContent(markdown);
    }
  };

  return (
    <div className="edit_wrap dark:dark">
      <Editor
        ref={editorRef}
        initialValue="여기에 작성하세요!"
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        hideModeSwitch={true}
        language="ko-KR"
        plugins={[colorSyntax]}
      />
      <Button className="hover:cursor-pointer" onClick={handleSave}>
        저장하고 보기
      </Button>

      {content && (
        <>
          <Viewer initialValue={content} />
        </>
      )}
    </div>
  );
};

export default EditorWithViewer;
