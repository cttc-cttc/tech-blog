import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/pages/components/shadcn-custom/dark-mode-toggle";
import { NavMenu } from "@/pages/components/shadcn-custom/nav-menu";
import { useAuthStore } from "@/pages/components/utils/useAuthStore";
import { Link } from "react-router-dom";

export default function Header() {
  const { token, nickName, clearAuth } = useAuthStore();

  return (
    // bg-[#fafafa] dark:bg-[#0a0d11]
    <div className="w-full flex justify-center bg-background sticky top-0 z-50 pb-[16px]">
      <header className="flex w-full max-w-7xl p-6 text-gray-600 dark:text-gray-400">
        <div className="flex flex-1">
          <Link to="/">
            <h1 className="font-bold text-4xl">kwy's tech blog</h1>
          </Link>
        </div>
        <div className="flex flex-2 justify-end items-center">
          <NavMenu />
          {!token ? (
            <>
              <Link to="/register" className="ml-8">
                <Button className="text-sm hover:cursor-pointer" variant="outline">
                  회원가입
                </Button>
              </Link>
              <Link to="/login" className="ml-1">
                <Button className="text-sm bg-foreground text-background dark:bg-foreground dark:text-background hover:cursor-pointer">
                  로그인
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center ml-8">
                <p>{nickName}님</p>
                <p>환영합니다</p>
              </div>
              <Link to="/auth/mypage" className="ml-8">
                <Button className="text-sm hover:cursor-pointer" variant="outline">
                  마이페이지
                </Button>
              </Link>
              <Link to="/" className="ml-1">
                <Button
                  className="text-sm bg-foreground text-background dark:bg-foreground dark:text-background hover:cursor-pointer"
                  onClick={clearAuth}
                >
                  로그아웃
                </Button>
              </Link>
            </>
          )}
          <DarkModeToggle />
        </div>
      </header>
    </div>
  );
}
