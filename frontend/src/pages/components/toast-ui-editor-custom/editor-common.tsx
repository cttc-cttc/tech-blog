import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/toastui-editor.css";

const EditorCommon = () => {
  return (
    <Editor
      initialValue="hello jenny"
      previewStyle="vertical"
      height="600px"
      initialEditType="wysiwyg"
      useCommandShortcut={false}
    />
  );
};

export default EditorCommon;
