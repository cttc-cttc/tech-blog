// import { ModeToggle } from "@/components/ui/mode-toggle";
import { NavMenu } from "./shadcn-custom/nav-menu";
import { DarkModeToggle } from "./shadcn-custom/dark-mode-toggle";

export default function Header() {
  return (
    <header className="flex">
      <NavMenu />
      {/* <ModeToggle /> */}
      <DarkModeToggle />
    </header>
  );
}
