"use client";

import { useState } from "react";

import Sidebar from "@/components/shared/Sidebar";
import TopNavbar from "@/components/shared/TopNavbar";

export default function DashboardLayout({
  children,
}) {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex flex-1 flex-col">
        <TopNavbar
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}