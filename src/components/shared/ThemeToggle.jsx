"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setDarkMode((value) => !value)}
      className="rounded-lg bg-slate-100 p-2 text-slate-700 hover:bg-slate-200 transition"
      aria-label="Toggle Theme"
    >
      {darkMode ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}