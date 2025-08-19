import axios from "axios";
import { useEffect, useState } from "react";
// import "@toast-ui/editor/dist/toastui-editor.css";
// import "tui-color-picker/dist/tui-color-picker.css";
// import "@toast-ui/editor/dist/toastui-editor-viewer.css";
// import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
// import "@toast-ui/editor/dist/i18n/ko-kr";
// import "../../pages/components/toast-ui-editor-custom/toast-editor-dark.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/pages/components/utils/useAuthStore";
import CustomViewer from "../components/toast-ui-editor-custom/custom-viewer";
import { CustomSkeleton } from "../components/shadcn-custom/custom-skeleton";

export default function Intro() {
  const { role } = useAuthStore();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pageLoad = async () => {
      try {
        const response = await axios.get("/api/intro");
        // console.log("data load successful:", response.data);
        // console.log("http status:" + response.status);
        if (response.status === 204) {
          setTitle("");
          setContents("");
        } else {
          setTitle(response.data.title);
          setContents(response.data.contents);
        }
      } catch (error) {
        console.error("data load failed:", error);
      } finally {
        setLoading(false);
      }
    };

    pageLoad();
  }, []);

  const isAdmin = role === "ROLE_ADMIN";
  const hasContents = Boolean(contents); // (!!contents)

  const renderActionButton = () => {
    // 로그인 유저가 관리자이고
    if (isAdmin) {
      // 작성된 글이 없으면
      if (!hasContents) {
        return (
          <Link to="/intro/write">
            <Button className="hover:cursor-pointer" variant="default">
              글쓰기
            </Button>
          </Link>
        );
      }

      // 작성된 글이 있으면
      return (
        <Link to="/intro/update">
          <Button className="hover:cursor-pointer" variant="default">
            수정
          </Button>
        </Link>
      );
    }
  };

  return (
    <div className="container max-w-4xl mt-10">
      {loading ? (
        <div className="flex justify-center mt-4">
          <CustomSkeleton type="posts" />
        </div>
      ) : contents ? (
        <>
          {title && <div className="text-4xl font-bold text-center py-4 mb-4">{title}</div>}
          <div className="edit_wrap dark:dark">
            <CustomViewer contents={contents} />
          </div>
        </>
      ) : (
        <p className="text-center p-6">작성된 내용이 없습니다</p>
      )}
      <div className="py-6 flex w-full justify-end">
        {/* 로그인 유저가 관리자이면 글쓰기/수정 버튼 표시 */}
        {renderActionButton()}
      </div>
    </div>
  );
}
