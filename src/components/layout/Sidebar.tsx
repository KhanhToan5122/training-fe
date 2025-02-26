import { Package, PlusCircle, Edit, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarProvider";
import SidebarItem from "./SidebarItem"; // Component riêng cho từng mục menu

export default function Sidebar() {
  const { open } = useSidebar();

  return (
    <aside
      className={cn(
        "bg-gray-900 text-white h-screen transition-all",
        open ? "w-64" : "w-16"
      )}
    >
      {/* Toggle Sidebar Button */}
      <div className="flex items-center justify-center px-4 py-3">
        <h1 className={cn("text-lg font-bold", !open && "hidden")}>Uplon</h1>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-4">
        {/* Menu Products */}
        <SidebarItem icon={Package} label="List Products" to="/products" />
        <SidebarItem icon={PlusCircle} label="Add Product" to="/products/add" />
        <SidebarItem icon={Edit} label="Update Product" to="/products/update" />

        {/* Menu Users */}
        <SidebarItem icon={Users} label="List Users" to="/users" />
        <SidebarItem icon={User} label="Add User" to="/users/add" />
        <SidebarItem icon={Edit} label="Update User" to="/users/update" />
      </nav>
    </aside>
  );
}
