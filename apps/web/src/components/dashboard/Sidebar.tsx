"use client";

import { useState } from "react";
import { Home, FileText, Settings, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  const items = [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Documents", icon: FileText, href: "/documents" },
    { label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "h-screen bg-background border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h1 className="text-xl font-semibold">Cortex</h1>}
        <button
          onClick={toggleCollapsed}
          className="p-1 rounded hover:bg-muted"
        >
          <Menu size={20} />
        </button>
      </div>
      <nav className="flex flex-col gap-2 p-4">
        {items.map(({ label, icon: Icon, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded p-2 hover:bg-muted transition-all text-sm",
              collapsed && "justify-center"
            )}
          >
            <Icon className="h-5 w-5" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
