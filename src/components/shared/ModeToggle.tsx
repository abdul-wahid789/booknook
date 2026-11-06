"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || theme === "dark";
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-9 w-9 rounded-lg border-border bg-card text-foreground hover:bg-muted"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="h-[1.1rem] w-[1.1rem] transition-transform duration-200" />
      ) : (
        <Moon className="h-[1.1rem] w-[1.1rem] transition-transform duration-200" />
      )}
    </Button>
  );
}