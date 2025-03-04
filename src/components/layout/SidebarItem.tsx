import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarProvider";
import { Link } from "react-router-dom";

type SidebarItemProps = {
  icon?: React.ElementType;
  label: string;
  active?: boolean;
  hasSubmenu?: boolean;
  to?: string;
};

export default function SidebarItem({ icon: Icon, label, to, active, hasSubmenu }: SidebarItemProps) {
  const {open} = useSidebar();

  if (!Icon && !to) {
    return (
      <div className="px-4 py-2 font-bold text-gray-500 text-xs">
        {label}
      </div>
    )
  }

  return (
    <Link
      to ={to || "#"}
      className={cn(
        "flex items-center px-4 py-2 cursor-pointer hover:bg-blue-200 hover:text-blue-400 transition"
      )}
    >
      {Icon && <Icon className="w-5 h-5 mr-3" />}
      <span className={cn("ml-3 transition-all", !open && "hidden")}>{label}</span> 
      {hasSubmenu && open &&
       <ChevronRight className="ml-auto w-4 h-4" />}
    </Link>
  );
}
