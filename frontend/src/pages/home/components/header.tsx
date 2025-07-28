// import { ModeToggle } from "@/components/ui/mode-toggle";
import { DarkModeToggle } from "@/pages/components/shadcn-custom/dark-mode-toggle";
import { NavMenu } from "@/pages/components/shadcn-custom/nav-menu";

export default function Header() {
  return (
    <header className="flex">
      <NavMenu />
      {/* <ModeToggle /> */}
      <DarkModeToggle />
    </header>
  );
}
