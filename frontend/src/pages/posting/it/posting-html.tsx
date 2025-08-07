import { useState } from "react";
import CategorySelector from "../category-selector";
import axios from "axios";

export default function PostingHTML() {
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!categoryId) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    await axios.post("/api/posts", {
      title: "제목",
      contents: "내용",
      writer: "작성자",
      categoryId: categoryId,
    });

    alert("글 등록 완료");
  };

  return (
    <div>
      <h2>글 작성</h2>

      <CategorySelector onSelect={setCategoryId} />

      {/* 제목, 내용, 작성자 등 입력 필드 생략 */}

      <button onClick={handleSubmit}>등록</button>
    </div>
  );
}
