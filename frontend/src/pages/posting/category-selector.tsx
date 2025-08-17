import { useEffect, useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";

interface Category {
  id: number;
  name: string;
  children: Category[];
}

interface CategorySelectorProps {
  onSelect: (id: number) => void;
  selectedId?: number | null;
}

export default function CategorySelector({ onSelect, selectedId }: CategorySelectorProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/categories/tree").then(res => {
      setCategories(res.data);

      // 데이터 로드 후 초기값 세팅
      if (selectedId != null) {
        setSelected(selectedId);
      }
      setIsLoading(false);
    });
  }, [selectedId]);

  // 데이터 로드 전에는 렌더 안 함 (또는 로딩 표시)
  if (isLoading) {
    return <div>카테고리 불러오는 중...</div>;
  }

  return (
    <div className="w-full mb-[24px]">
      <Select
        value={selected != null ? String(selected) : ""}
        onValueChange={value => {
          const numValue = Number(value);
          setSelected(numValue);
          onSelect(numValue);
        }}
      >
        <SelectTrigger className="w-full dark:border-accent-foreground/80 rounded-sm">
          <SelectValue placeholder="카테고리를 선택하세요" />
        </SelectTrigger>
        <SelectContent className="dark:border-accent-foreground/80 rounded-sm">
          {categories.map(parent => (
            <SelectGroup key={parent.id}>
              <SelectLabel className="text-muted-foreground text-sm p-2 bg-foreground/10 rounded-sm">
                {parent.name}
              </SelectLabel>
              {parent.children.map(child => (
                <SelectItem
                  key={child.id}
                  value={String(child.id)}
                  className="hover:cursor-pointer"
                >
                  {child.name}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
