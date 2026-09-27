"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { SIDEBAR_LINKS } from "@/utils/navigation";

export default function Sidebar({
  isOpen,
}) {
  const pathname = usePathname();
  return (
    <aside className={`fixed lg:static z-50 left-0 top-0 h-screen w-64 transform lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 bg-white/90 dark:bg-neutral-900/75 backdrop-blur border-r border-gray-200 dark:border-neutral-800 shadow-md`}> 
      <div className="p-5 border-b border-gray-100 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow">PM</div>
          <div>
            <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Project Management</h2>
            <div className="text-xs text-gray-500">Control panel</div>
          </div>
        </div>
      </div>

      <nav className="p-2">
        {SIDEBAR_LINKS.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 my-1 rounded-md text-sm transition-colors duration-150 ${active ? "bg-indigo-50 dark:bg-neutral-800 text-indigo-600" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800"}`}
            >
              <item.icon className={`h-5 w-5 ${active ? "text-indigo-600" : "text-gray-500 dark:text-gray-400"}`} />
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}