"use client";

import SearchBar from "@/components/shared/SearchBar";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { NotificationDropdown } from "@/components/shared/NotificationDropdown";
import { ProfileDropdown } from "@/components/shared/ProfileDropdown";

export default function TopNavbar() {
  return (
    <header className="bg-white/80 dark:bg-neutral-900/70 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-800 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">PM</div>
          <div className="hidden sm:block">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">Project Management</div>
            <div className="text-xs text-gray-500">Dashboard</div>
          </div>
        </div>

        <div className="hidden md:block w-[460px]">
          <SearchBar />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="md:hidden w-full max-w-xs">
          <SearchBar />
        </div>
        <NotificationDropdown />
        <ThemeToggle />
        <ProfileDropdown />
      </div>
    </header>
  );
}