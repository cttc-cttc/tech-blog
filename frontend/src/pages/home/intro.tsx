import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useEffect, useState } from "react";
// import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
// import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "../../pages/components/toast-ui-editor-custom/toast-editor-dark.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/pages/components/utils/useAuthStore";

export default function Intro() {
  const { role } = useAuthStore();
  const [contents, setContents] = useState("");

  useEffect(() => {
    const pageLoad = async () => {
      try {
        const response = await axios.get("/api/intro");
        setContents(response.data);
        // console.log("data load successful:", response.data);
      } catch (error) {
        console.error("data load failed:", error);
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
            <Button className="hover:cursor-pointer" variant="outline">
              글쓰기
            </Button>
          </Link>
        );
        // 작성된 글이 있으면
      } else {
        return (
          <Link to="/intro/update">
            <Button className="hover:cursor-pointer" variant="outline">
              수정
            </Button>
          </Link>
        );
      }
    }
  };

  return (
    <div className="container max-w-4xl mt-6">
      <div className="edit_wrap dark:dark">
        {/* contents 값이 존재하면 뷰어로 내용 표시, 없으면 작성된 내용이 없다는 문자열을 표시 */}
        {contents ? (
          <Viewer initialValue={contents} />
        ) : (
          <p className="text-center p-6">작성된 내용이 없습니다</p>
        )}
        <div className="py-6 flex w-full justify-end">
          {/* 로그인 유저가 관리자이면 글쓰기/수정 버튼 표시 */}
          {renderActionButton()}
        </div>
      </div>
    </div>
  );
}
