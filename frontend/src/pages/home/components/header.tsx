import { DarkModeToggle } from "@/pages/components/shadcn-custom/dark-mode-toggle";
import { NavMenu } from "@/pages/components/shadcn-custom/nav-menu";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full flex justify-center bg-background sticky top-0 z-50">
      <header className="flex w-full max-w-7xl p-6 text-gray-600 dark:text-gray-400">
        <div className="flex flex-1">
          <Link to="/">
            <h1 className="font-bold text-4xl">kwy's technical blog</h1>
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <NavMenu />
          <DarkModeToggle />
        </div>
      </header>
    </div>
  );
}
