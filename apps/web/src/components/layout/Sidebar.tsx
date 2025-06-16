"use client";

import { useState } from "react";
import { Home, FileText, Settings, Menu, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { SidebarItem } from "./SidebarItem";
import { Button } from "../ui/button";
import SidebarLogoutButton from "./SidebarLogoutButton";

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
        "h-screen border-r bg-background transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 h-[63px]">
        {!collapsed && <h1 className="text-md font-semibold">Cortex</h1>}
        <Button
          variant={"ghost"}
          className="rounded hover:bg-muted"
          onClick={toggleCollapsed}
        >
          <Menu size={20} />
        </Button>
      </div>
      <Separator />
      <nav className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
        {items.map(({ label, icon, href }) => (
          <SidebarItem
            key={href}
            icon={icon}
            label={label}
            href={href}
            collapsed={collapsed}
          />
        ))}
      </nav>
      <Separator />
      <SidebarLogoutButton collapsed={collapsed} />
    </aside>
  );
}
