import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import type { Editor as EditorType } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

interface EditorOnChangeProps {
  onChange: (value: string) => void;
}

export default function CustomEditor({ onChange }: EditorOnChangeProps) {
  const editorRef = useRef<EditorType>(null);

  const handleChange = () => {
    const markDown = editorRef.current?.getInstance().getMarkdown();
    onChange(markDown);
  };

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
}
