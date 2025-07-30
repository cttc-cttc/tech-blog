import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

type CustomViewerProps = {
  contents: string;
};

export default function CustomViewer({ contents }: CustomViewerProps) {
  return <Viewer initialValue={contents || ""} />;
}
