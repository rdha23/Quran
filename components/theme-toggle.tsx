"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-end">
        <div className="h-11 w-11" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex justify-end">
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {isDark ? (
          <Sun className="h-5 w-5 text-yellow-500 transition-transform duration-300 hover:rotate-12" />
        ) : (
          <Moon className="h-5 w-5 text-blue-500 transition-transform duration-300 hover:-rotate-12" />
        )}
      </button>
    </div>
  );
}
