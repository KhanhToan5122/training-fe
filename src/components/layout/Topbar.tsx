import {
  Menu,
  Bell,
  Mail,
  Settings,
  Search,
  Moon,
  User,
  Lock,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/components/layout/SidebarProvider";
import { useState, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Topbar() {
  const { logout } = useAuth();
  const { toggleSidebar } = useSidebar();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    {
      title: "Products",
      items: ["List products", "Add products"],
      links: ["/products", "/products/add"],
    },
    {
      title: "Users",
      items: ["List users", "Add users"],
      links: ["/users", "/users/add"],
    },
  ];
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  return (
    <header className="w-full bg-gray-800 px-6 py-4 shadow-md flex items-center">
      {/* Left: Toggle Sidebar + Logo */}
      <div className="flex items-center justify-start flex-1 gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="w-6 h-6 text-gray-400" />
        </Button>

        {/* Left: Search Bar */}
        <div className="relative w-[25%] ">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-4 w-full bg-gray-700 text-white border-none rounded-full py-2"
          />
          <Search className="absolute top-1/2 transform -translate-y-1/2 right-5 text-gray-400 w-4 h-4" />
        </div>

        <div className="relative">
          {/* Nút Pages */}
          <button
            className="flex items-center text-gray-400 font-semibold bg-gray-800 px-4 py-2"
            onClick={() => setOpen(!open)}
          >
            Pages <ChevronDown className="w-4 h-4 ml-2" />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute left-0 mt-5 w-[400px] bg-white shadow-lg rounded-xs p-3 flex z-50 ">
              {menuItems.map((category) => (
                <div key={category.title} className="w-1/2 px-4">
                  <h3 className="font-bold text-gray-600 text-lg mb-2">
                    {category.title}
                  </h3>
                  <ul className="space-y-1">
                    {category.items.map((item, index) => (
                      <li key={item}>
                        <Link
                          to={category.links[index]}
                          className="flex items-center text-gray-600 hover:text-blue-400 cursor-pointer"
                          onClick={() => setOpen(false)}
                        >
                          <ChevronRight className="w-3 h-3 mr-2" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Icons + User Profile */}
      <div className="flex items-center justify-end flex-1 gap-4">
        <Button variant="ghost" size="icon">
          <Moon className="w-6 h-6 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="w-6 h-6 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon">
          <Mail className="w-6 h-6 text-gray-500" />
        </Button>

        {/* User Avatar + Name */}
        <div className="relative" ref={dropdownRef}>
          {/* Avatar + Tên */}
          <button
            className="flex items-center gap-2 text-gray-400 font-semibold"
            onClick={() => setOpenUser(!openUser)}
          >
            <img
              src="https://avatar.iran.liara.run/public"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden md:block">Alex M.</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Dropdown Menu */}
          {openUser && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg overflow-hidden z-50">
              <div className="bg-blue-400 text-white text-sm font-semibold px-4 py-2">
                Welcome !
              </div>
              <ul className="py-2">
                <li className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <User className="w-4 h-4" /> Profile
                </li>
                <li className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <Settings className="w-4 h-4" /> Settings
                </li>
                <li className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <Lock className="w-4 h-4" /> Lock Screen
                </li>
                <li
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer border-t"
                  onClick={() => logout()}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        <Button variant="ghost" size="icon">
          <Settings className="w-6 h-6 text-gray-500" />
        </Button>
      </div>
    </header>
  );
}
