"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-2 bg-gray-100/80 dark:bg-neutral-800/60 px-3 py-2 rounded-lg w-full max-w-md transition-shadow duration-150 shadow-sm hover:shadow-md focus-within:shadow-md ring-0 focus-within:ring-2 focus-within:ring-indigo-400">
      <Search className="h-5 w-5 text-slate-500" />

      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
      />
    </div>
  );
}