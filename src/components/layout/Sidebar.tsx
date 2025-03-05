import { Package, PlusCircle, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarProvider";
import SidebarItem from "./SidebarItem"; // Component riêng cho từng mục menu
import uploaduplon from '@/assets/uploaduplon.png';
import uplon_icon from '@/assets/uplon_icon.png';

export default function Sidebar() {
  const { open } = useSidebar();

  return (
    <aside
      className={cn(
        "bg-white-900 text-gray-600 h-screen font-semibold transition-all",
        open ? "w-64" : "w-16"
      )}
    >
      {/* Toggle Sidebar Button */}
      <div className="flex justify-center px-4 py-5">
        {open ? (
          <img src={uploaduplon} alt="Uplon Logo" className="h-8 w-auto" />
        ) : (
          <img src={uplon_icon} alt="Uplon Logo" className="h-8 w-auto" />
        )}
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-4">
        {/* Menu Products */}
        {open ?<SidebarItem label=" PRODUCTS" /> : null}
        <SidebarItem icon={Package} label="Products" to="/products" />
        <SidebarItem icon={PlusCircle} label="Add Product" to="/products/add" />
        {/* <SidebarItem icon={Edit} label="Update Product" to="/products/update" /> */}

        {/* Menu Users */}
        {open ?<SidebarItem label=" USERS" /> : null}
        <SidebarItem icon={Users} label="Users" to="/users" />
        <SidebarItem icon={User} label="Add User" to="/users/add" />
        {/* <SidebarItem icon={Edit} label="Update User" to="/users/update" /> */}
      </nav>
    </aside>
  );
}
