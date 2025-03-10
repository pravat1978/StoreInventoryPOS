import React, { useState } from "react";
import { Link } from "react-router-dom";
import MetricsPanel from "./MetricsPanel";
import AlertsPanel from "./AlertsPanel";
import SalesChart from "./SalesChart";
import PromotionsPreview from "./PromotionsPreview";
import SideNav from "../navigation/SideNav";
import { Button } from "../ui/button";
import { Bell, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ManagerDashboardProps {
  userName?: string;
  userRole?: "manager" | "admin";
  userAvatar?: string;
}

const ManagerDashboard = ({
  userName = "Store Manager",
  userRole = "manager",
  userAvatar = "",
}: ManagerDashboardProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleViewAllAlerts = () => {
    console.log("View all alerts clicked");
  };

  const handleDismissAlert = (id: string) => {
    console.log(`Dismiss alert ${id}`);
    setNotificationsCount(Math.max(0, notificationsCount - 1));
  };

  const handleViewAllPromotions = () => {
    console.log("View all promotions clicked");
  };

  const handleViewPromotion = (id: string) => {
    console.log(`View promotion ${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out h-full",
          sidebarCollapsed ? "w-20" : "w-64",
        )}
      >
        <SideNav
          userName={userName}
          userRole={userRole}
          userAvatar={userAvatar}
          activeItem="dashboard"
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mr-4"
            >
              {sidebarCollapsed ? (
                <Menu className="h-5 w-5" />
              ) : (
                <X className="h-5 w-5" />
              )}
            </Button>
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationsCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                    {notificationsCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Metrics Panel */}
            <MetricsPanel />

            {/* Charts and Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SalesChart />
              </div>
              <div>
                <AlertsPanel
                  onViewAll={handleViewAllAlerts}
                  onDismiss={handleDismissAlert}
                />
              </div>
            </div>

            {/* Promotions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <PromotionsPreview
                  onViewAll={handleViewAllPromotions}
                  onViewPromotion={handleViewPromotion}
                />
              </div>
              <div className="lg:col-span-2">
                {/* Additional dashboard widget could go here */}
                <div className="bg-white rounded-lg shadow p-6 h-full flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <Link to="/inventory">
                        <Button
                          variant="outline"
                          className="w-full h-24 flex flex-col items-center justify-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-package"
                          >
                            <path d="m7.5 4.27 9 5.15" />
                            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                            <path d="m3.3 7 8.7 5 8.7-5" />
                            <path d="M12 22V12" />
                          </svg>
                          <span>Inventory</span>
                        </Button>
                      </Link>
                      <Link to="/pos">
                        <Button
                          variant="outline"
                          className="w-full h-24 flex flex-col items-center justify-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-shopping-cart"
                          >
                            <circle cx="8" cy="21" r="1" />
                            <circle cx="19" cy="21" r="1" />
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                          </svg>
                          <span>POS</span>
                        </Button>
                      </Link>
                      <Link to="/promotions">
                        <Button
                          variant="outline"
                          className="w-full h-24 flex flex-col items-center justify-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-tag"
                          >
                            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                            <circle cx="7.5" cy="7.5" r="1.5" />
                          </svg>
                          <span>Promotions</span>
                        </Button>
                      </Link>
                      <Link to="/reports">
                        <Button
                          variant="outline"
                          className="w-full h-24 flex flex-col items-center justify-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-bar-chart-3"
                          >
                            <path d="M3 3v18h18" />
                            <path d="M18 17V9" />
                            <path d="M13 17V5" />
                            <path d="M8 17v-3" />
                          </svg>
                          <span>Reports</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagerDashboard;
