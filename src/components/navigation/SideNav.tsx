import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tag,
  Settings,
  LogOut,
  Users,
  BarChart3,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  tooltip: string;
}

interface SideNavProps {
  userName?: string;
  userRole?: "manager" | "admin";
  userAvatar?: string;
  activeItem?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const SideNav: React.FC<SideNavProps> = ({
  userName = "Store Manager",
  userRole = "manager",
  userAvatar = "",
  activeItem = "dashboard",
  collapsed = false,
  onToggleCollapse = () => {},
}) => {
  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/dashboard",
      tooltip: "View dashboard",
    },
    {
      label: "Inventory",
      icon: <Package size={20} />,
      href: "/inventory",
      tooltip: "Manage inventory",
    },
    {
      label: "POS",
      icon: <ShoppingCart size={20} />,
      href: "/pos",
      tooltip: "Point of Sale",
    },
    {
      label: "Promotions",
      icon: <Tag size={20} />,
      href: "/promotions",
      tooltip: "Manage promotions",
    },
    {
      label: "Reports",
      icon: <BarChart3 size={20} />,
      href: "/reports",
      tooltip: "View reports",
    },
    {
      label: "Staff",
      icon: <Users size={20} />,
      href: "/staff",
      tooltip: "Manage staff",
    },
    {
      label: "Settings",
      icon: <Settings size={20} />,
      href: "/settings",
      tooltip: "System settings",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-slate-900 text-white transition-all duration-300",
        collapsed ? "w-20" : "w-64",
      )}
    >
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={
                userAvatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`
              }
              alt={userName}
            />
            <AvatarFallback className="bg-slate-700">
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <h3 className="text-sm font-medium truncate">{userName}</h3>
              <p className="text-xs text-slate-400 truncate">{userRole}</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={item.href}>
                      <Button
                        variant={
                          activeItem === item.label.toLowerCase()
                            ? "secondary"
                            : "ghost"
                        }
                        className={cn(
                          "w-full justify-start text-white hover:text-white hover:bg-slate-800",
                          activeItem === item.label.toLowerCase()
                            ? "bg-slate-800"
                            : "",
                          collapsed ? "justify-center px-2" : "px-3",
                        )}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {!collapsed && <span>{item.label}</span>}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">{item.tooltip}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white hover:text-white hover:bg-slate-800",
                  collapsed ? "justify-center px-2" : "px-3",
                )}
              >
                <span className="mr-2">
                  <LogOut size={20} />
                </span>
                {!collapsed && <span>Logout</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">Logout from system</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SideNav;
