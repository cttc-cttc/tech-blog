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

export default function CategorySelector({ onSelect }: { onSelect: (categoryId: number) => void }) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get("/api/categories/tree").then(res => {
      // console.log(res.data);
      setCategories(res.data);
    });
  }, []);

  return (
    <div className="w-full mb-[24px]">
      <Select
        onValueChange={value => {
          onSelect(Number(value));
        }}
      >
        <SelectTrigger className="w-full dark:border-accent-foreground/80 rounded-sm">
          <SelectValue placeholder="카테고리를 선택하세요" />
        </SelectTrigger>
        <SelectContent className="dark:border-accent-foreground/80 rounded-sm">
          {categories.map(parent => (
            <SelectGroup key={parent.id}>
              <SelectLabel className="text-muted-foreground text-sm p-2">{parent.name}</SelectLabel>
              {parent.children.map(child => (
                <SelectItem key={child.id} value={String(child.id)}>
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
