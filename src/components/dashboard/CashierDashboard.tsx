import React from "react";
import { Link } from "react-router-dom";
import LimitedMetricsPanel from "./LimitedMetricsPanel";
import CashierNav from "../navigation/CashierNav";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Bell, Calendar, Clock, ShoppingCart } from "lucide-react";

interface CashierDashboardProps {
  userName?: string;
  dailySales?: string;
  salesGoal?: string;
  customerCount?: string;
  activePromotions?: string;
  upcomingShift?: string;
  pendingOrders?: number;
  onLogout?: () => void;
}

const CashierDashboard = ({
  userName = "Sarah Johnson",
  dailySales = "$1,245.89",
  salesGoal = "$2,000.00",
  customerCount = "37",
  activePromotions = "3",
  upcomingShift = "Tomorrow, 9:00 AM - 5:00 PM",
  pendingOrders = 2,
  onLogout = () => console.log("Logout clicked"),
}: CashierDashboardProps) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Navigation */}
      <CashierNav userName={userName} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome, {userName}</h1>
              <p className="text-gray-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                </Button>
                {pendingOrders > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {pendingOrders}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Metrics Panel */}
          <LimitedMetricsPanel
            dailySales={dailySales}
            salesGoal={salesGoal}
            customerCount={customerCount}
            activePromotions={activePromotions}
          />

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-blue-500" />
                  Quick POS Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Start a new transaction or continue with a pending one.
                </p>
                <Button className="w-full" asChild>
                  <Link to="/pos">Open POS</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  Upcoming Shift
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Your next scheduled work shift.
                </p>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span>{upcomingShift}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-500" />
                  Active Promotions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Current promotions to inform customers about.
                </p>
                <div className="space-y-2">
                  <div className="p-2 bg-blue-50 text-blue-700 rounded-md text-sm">
                    Summer Sale: 20% off all apparel
                  </div>
                  <div className="p-2 bg-green-50 text-green-700 rounded-md text-sm">
                    Buy 3 art supplies, get 1 free
                  </div>
                  <div className="p-2 bg-purple-50 text-purple-700 rounded-md text-sm">
                    Loyalty members: Double points this week
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Transaction ID</th>
                      <th className="text-left py-3 px-4">Time</th>
                      <th className="text-left py-3 px-4">Items</th>
                      <th className="text-left py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">#TRX-2023-1089</td>
                      <td className="py-3 px-4">10:32 AM</td>
                      <td className="py-3 px-4">4 items</td>
                      <td className="py-3 px-4 font-medium">$78.50</td>
                      <td className="py-3 px-4">Credit Card</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">#TRX-2023-1088</td>
                      <td className="py-3 px-4">9:45 AM</td>
                      <td className="py-3 px-4">2 items</td>
                      <td className="py-3 px-4 font-medium">$45.99</td>
                      <td className="py-3 px-4">Cash</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">#TRX-2023-1087</td>
                      <td className="py-3 px-4">9:15 AM</td>
                      <td className="py-3 px-4">6 items</td>
                      <td className="py-3 px-4 font-medium">$124.75</td>
                      <td className="py-3 px-4">Digital Wallet</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">#TRX-2023-1086</td>
                      <td className="py-3 px-4">Yesterday</td>
                      <td className="py-3 px-4">3 items</td>
                      <td className="py-3 px-4 font-medium">$67.25</td>
                      <td className="py-3 px-4">Credit Card</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm">
                  View All Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;
