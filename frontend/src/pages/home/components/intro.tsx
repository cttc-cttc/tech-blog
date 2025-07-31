import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useEffect, useState } from "react";
// import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
// import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "../../components/toast-ui-editor-custom/toast-editor-dark.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Intro() {
  const [contents, setContents] = useState("");

  const pageLoad = async () => {
    try {
      const response = await axios.get("/api/intro");
      setContents(response.data);
      // console.log("data load successful:", response.data);
    } catch (error) {
      console.error("data load failed:", error);
    }
  };

  useEffect(() => {
    pageLoad();
  }, []);

  return (
    <div className="container max-w-4xl mt-6">
      <div
        className="edit_wrap dark:dark px-[25px] py-[18px] dark:px-0 dark:py-0
      "
      >
        {/* contents 값이 존재하면 뷰어로 내용 표시, 없으면 작성된 내용이 없다는 문자열을 표시 */}
        {contents ? (
          <>
            <Viewer initialValue={contents} />
            <div className="py-6 flex w-full justify-end">
              <Link to="/intro/update">
                <Button className="hover:cursor-pointer" variant="outline">
                  수정
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-center p-6">작성된 내용이 없습니다</p>
            <div className="py-6 flex w-full justify-end">
              <Link to="/intro/write">
                <Button className="hover:cursor-pointer" variant="outline">
                  글쓰기
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
