import { Menu, Bell, Mail, Settings, Search, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/components/layout/SidebarProvider";

export default function Topbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="w-full bg-[#2c323f] px-6 py-3 shadow-md flex items-center justify-between">
      {/* Left: Toggle Sidebar + Logo */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Center: Search Bar */}
      <div className="relative flex-1 max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10 w-full bg-gray-700 text-white border-none rounded-lg"
        />
      </div>

      {/* Right: Icons + User Profile */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Moon className="w-6 h-6 text-white" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="w-6 h-6 text-white" />
        </Button>
        <Button variant="ghost" size="icon">
          <Mail className="w-6 h-6 text-white" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="w-6 h-6 text-white" />
        </Button>

        {/* User Avatar + Name */}
        <div className="flex items-center gap-2">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-white hidden md:block">Alex M.</span>
        </div>
      </div>
    </header>
  );
}
