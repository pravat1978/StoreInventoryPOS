import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { AlertTriangle, Package, ShoppingCart, Truck } from "lucide-react";

interface AlertItem {
  id: string;
  type: "low-stock" | "out-of-stock" | "delivery" | "order";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
}

interface AlertsPanelProps {
  alerts?: AlertItem[];
  onViewAll?: () => void;
  onDismiss?: (id: string) => void;
}

const AlertsPanel = ({
  alerts = [
    {
      id: "1",
      type: "low-stock",
      title: "Low Stock Alert",
      description: "T-shirts (Medium, Black) - Only 5 items remaining",
      priority: "high",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "out-of-stock",
      title: "Out of Stock",
      description: "Acrylic Paint Set (12 colors) - Reorder needed",
      priority: "high",
      timestamp: "1 day ago",
    },
    {
      id: "3",
      type: "delivery",
      title: "Delivery Arriving",
      description: "Shipment #4392 arriving today at 2:00 PM",
      priority: "medium",
      timestamp: "Today",
    },
    {
      id: "4",
      type: "order",
      title: "Bulk Order Pending",
      description: "Order #7821 for 50 canvas sets awaiting approval",
      priority: "low",
      timestamp: "3 hours ago",
    },
  ],
  onViewAll = () => console.log("View all alerts"),
  onDismiss = (id) => console.log(`Dismiss alert ${id}`),
}: AlertsPanelProps) => {
  const getAlertIcon = (type: AlertItem["type"]) => {
    switch (type) {
      case "low-stock":
      case "out-of-stock":
        return <Package className="h-5 w-5 text-amber-500" />;
      case "delivery":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "order":
        return <ShoppingCart className="h-5 w-5 text-green-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const getPriorityBadge = (priority: AlertItem["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">
            Alerts & Notifications
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="mt-1">{getAlertIcon(alert.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                    {getPriorityBadge(alert.priority)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {alert.description}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {alert.timestamp}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => onDismiss(alert.id)}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertTriangle className="h-10 w-10 text-gray-300 mb-2" />
              <p className="text-gray-500">No alerts at this time</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
