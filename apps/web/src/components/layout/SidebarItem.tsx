import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  collapsed: boolean;
}

export function SidebarItem({
  icon: Icon,
  label,
  href,
  collapsed,
}: SidebarItemProps) {
  return (
    <Link href={href}>
      <Button variant="ghost" className="w-full justify-start">
        <Icon className="mr-2 h-5 w-5" />
        {!collapsed && label}
      </Button>
    </Link>
  );
}
