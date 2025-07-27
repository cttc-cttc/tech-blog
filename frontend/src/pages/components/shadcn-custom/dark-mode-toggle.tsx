import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import { useState } from "react";

export function DarkModeToggle() {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const { setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(systemTheme);

  const toggleTheme = (resolvedTheme: string) => {
    if (resolvedTheme === "dark") {
      setCurrentTheme("light");
      setTheme("light");
    } else {
      setCurrentTheme("dark");
      setTheme("dark");
    }
  };

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => toggleTheme(currentTheme)}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </>
  );
}
