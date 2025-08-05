import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/pages/components/shadcn-custom/dark-mode-toggle";
import { NavMenu } from "@/pages/components/shadcn-custom/nav-menu";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    // bg-[#fafafa] dark:bg-[#0a0d11]
    <div className="w-full flex justify-center bg-background sticky top-0 z-50">
      <header className="flex w-full max-w-7xl p-6 text-gray-600 dark:text-gray-400">
        <div className="flex flex-1">
          <Link to="/">
            <h1 className="font-bold text-4xl">kwy's tech blog</h1>
          </Link>
        </div>
        <div className="flex flex-1 justify-end items-center">
          <NavMenu />
          <Link to="/register">
            <Button className="ml-8 text-sm hover:cursor-pointer" variant="outline">
              회원가입
            </Button>
          </Link>
          <Link to="/login">
            <Button className="ml-1 text-sm bg-foreground text-background dark:bg-foreground dark:text-background hover:cursor-pointer">
              로그인
            </Button>
          </Link>
          <DarkModeToggle />
        </div>
      </header>
    </div>
  );
}
