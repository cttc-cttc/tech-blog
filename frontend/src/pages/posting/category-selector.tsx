import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  children: Category[];
}

export default function CategorySelector({ onSelect }: { onSelect: (categoryId: number) => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    axios.get("/api/categories/tree").then(res => {
      console.log(res.data);
      setCategories(res.data);
    });
  }, []);

  const renderOptions = (categories: Category[], depth = 0): React.ReactNode[] => {
    return categories.flatMap(category => {
      const indent = "—".repeat(depth); // 시각적 들여쓰기
      const option = (
        <option key={category.id} value={category.id}>
          {indent} {category.name}
        </option>
      );
      const children = renderOptions(category.children, depth + 1);
      return [option, ...children];
    });
  };

  return (
    <select
      value={selectedId ?? ""}
      onChange={e => {
        const id = parseInt(e.target.value);
        setSelectedId(id);
        onSelect(id); // 상위 컴포넌트에 전달
      }}
    >
      <option value="">카테고리를 선택하세요</option>
      {renderOptions(categories)}
    </select>
  );
}
