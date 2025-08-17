import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

type CustomViewerProps = {
  contents: string;
};

export default function CustomViewer({ contents }: CustomViewerProps) {
  return (
    <Viewer
      initialValue={contents || ""}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
}
