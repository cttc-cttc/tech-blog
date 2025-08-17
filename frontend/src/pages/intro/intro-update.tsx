import axios from "axios";
import { useEffect, useRef, useState } from "react";
import type { CustomEditorRef } from "../components/toast-ui-editor-custom/custom-editor";
import { extractImgUrl, validatePostField } from "../components/utils/post-utils";
import { useAuthStore } from "../components/utils/useAuthStore";
import { useNavigate } from "react-router-dom";
import CustomEditor from "../components/toast-ui-editor-custom/custom-editor";
import { Button } from "@/components/ui/button";

export default function IntroUpdate() {
  const [contents, setContents] = useState("");
  const editorRef = useRef<CustomEditorRef>(null);
  //   const [handled, setHandled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { nickName } = useAuthStore();
  const navigate = useNavigate();

  // 페이지 첫 로드 시 처리
  useEffect(() => {
    // const pageLoad = async () => {
    //   try {
    //     const response = await axios.get(`/api/intro`);
    //     // console.log("data load successful:", response.data);
    //     setContents(response.data.contents);
    //   } catch (error) {
    //     console.error("data load failed:", error);
    //   }
    // };

    // pageLoad();
    (async () => {
      const { data } = await axios.get(`/api/intro`);
      setContents(data.contents ?? "");
      setLoaded(true);
    })();
  }, []);

  // contents 상태가 설정된 후 에디터에 적용
  //   useEffect(() => {
  //     if (contents && !handled) {
  //       setHandled(true);

  //       if (editorRef.current) {
  //         editorRef.current.getEditorInstance()?.getInstance().setMarkdown(contents);
  //       }
  //     }
  //   }, [contents, handled]);

  // 글 수정
  const handleSubmit = async () => {
    if (!validatePostField(contents, "내용을 입력해주세요.")) {
      editorRef.current?.focus();
      return;
    }

    // 정규표현식으로 HTML 내 이미지 추출
    // 이후 서버에 함께 전송해서 어떤 이미지가 실제로 쓰였는지 DB에 반영
    const html = editorRef.current?.getHTML() ?? "";
    // console.log(html);
    const imageUrls = extractImgUrl(html);

    // 백엔드의 @RequestBody 안에 다 포함시켜야 됨 (json 형식)
    const payload = {
      contents,
      writer: nickName,
      images: imageUrls,
    };

    try {
      const response = await axios.put(`/api/intro`, payload, {
        headers: { "Contents-Type": "application/json" },
      });
      console.log(response.data);
      //   const { urlNameParent, urlNameChild, id } = response.data;
      //   navigate(`/posts/${urlNameParent}/${urlNameChild}/${id}`);
      navigate("/intro");
    } catch (err) {
      console.error("등록 실패: ", err);
    }
  };

  // 이전 페이지로 돌아가기
  const prevPage = () => {
    navigate("/intro");
  };

  return (
    <div className="container max-w-4xl mt-10">
      {/* 에디터 */}
      {loaded && <CustomEditor onChange={setContents} ref={editorRef} initialValue={contents} />}
      <div className="py-6 flex w-full justify-end gap-2">
        <Button className="hover:cursor-pointer" variant="outline" onClick={prevPage}>
          취소
        </Button>
        <Button className="hover:cursor-pointer" variant="default" onClick={handleSubmit}>
          수정
        </Button>
      </div>
    </div>
  );
}
