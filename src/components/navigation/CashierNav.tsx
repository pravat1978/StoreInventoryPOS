import React from "react";
import { Link } from "react-router-dom";
import { Home, ShoppingCart, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface CashierNavProps {
  userName?: string;
  onLogout?: () => void;
}

const CashierNav = ({
  userName = "Cashier",
  onLogout = () => console.log("Logout clicked"),
}: CashierNavProps) => {
  return (
    <div className="h-full w-[250px] bg-slate-800 text-white flex flex-col justify-between p-4">
      <div className="space-y-6">
        <div className="flex items-center justify-center py-4">
          <h2 className="text-xl font-bold">POS System</h2>
        </div>

        <div className="space-y-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-slate-700"
                  asChild
                >
                  <Link to="/dashboard" className="flex items-center gap-3">
                    <Home size={20} />
                    <span>Dashboard</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Go to dashboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-slate-700"
                  asChild
                >
                  <Link to="/pos" className="flex items-center gap-3">
                    <ShoppingCart size={20} />
                    <span>Point of Sale</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Open POS interface</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-700">
          <div className="h-8 w-8 rounded-full bg-slate-500 flex items-center justify-center">
            <User size={16} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-slate-300">Cashier</p>
          </div>
        </div>

        <Button
          variant="destructive"
          className="w-full flex items-center gap-2"
          onClick={onLogout}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default CashierNav;
