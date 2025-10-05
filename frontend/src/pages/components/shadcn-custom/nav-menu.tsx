"use client";

import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePostsStore } from "../utils/usePostsStore";

const itCategories = [
  { name: "HTML", url: "html" },
  { name: "CSS", url: "css" },
  { name: "JavaScript", url: "js" },
  { name: "React", url: "react" },
  { name: "DataBase", url: "db" },
  { name: "Java", url: "java" },
  { name: "Spring Boot", url: "sb" },
];

const jpCategories = [
  { name: "JLPT N2 단어", url: "n2tan" },
  { name: "JLPT N2 문법", url: "n2gm" },
  { name: "일본허 회화", url: "conv" },
  { name: "JLPT N1 단어", url: "n1tan" },
  { name: "JLPT N1 문법", url: "n1gm" },
];

export function NavMenu() {
  const { setSearchState, setSearchKeyword } = usePostsStore();
  const handleClick = () => {
    setSearchState(false); // 게시글 리스트의 검색 상태를 false로 설정
    setSearchKeyword(""); // 게시글 리스트의 검색창 값을 ""로 설정
    window.scrollTo({ top: 0 }); // 페이지 상단으로 스크롤
  };

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/intro">소개</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/posts/it" onClick={handleClick}>
            <NavigationMenuTrigger className="hover:cursor-pointer">IT</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                {itCategories.map(cat => (
                  <NavigationMenuLink asChild key={cat.url}>
                    <Link to={`/posts/it/${cat.url}`} onClick={handleClick}>
                      {cat.name}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/posts/jp" onClick={handleClick}>
            <NavigationMenuTrigger className="hover:cursor-pointer">일본어</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                {jpCategories.map(cat => (
                  <NavigationMenuLink asChild key={cat.url}>
                    <Link to={`/posts/jp/${cat.url}`} onClick={handleClick}>
                      {cat.name}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/todo">Todo List</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
