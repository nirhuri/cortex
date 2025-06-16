import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { logoutAction } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";

interface SidebarLogoutButtonProps {
  collapsed: boolean;
}

export default function SidebarLogoutButton({
  collapsed,
}: SidebarLogoutButtonProps) {
  const handleLogout = () => {
    logoutAction();
    redirect("/login");
  };

  return (
    <div className="mt-auto p-4">
      <Button
        variant={"ghost"}
        className="w-full justify-start text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-5 w-5" />
        {!collapsed && "Logout"}
      </Button>
    </div>
  );
}
