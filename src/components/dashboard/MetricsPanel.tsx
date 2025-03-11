import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  progress?: number;
}

const MetricCard = ({
  title = "Metric",
  value = "$0",
  description = "No data available",
  icon = <DollarSign className="h-4 w-4" />,
  trend,
  progress,
}: MetricCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between mt-1">
          <CardDescription>{description}</CardDescription>
          {trend && (
            <div
              className={`flex items-center text-xs ${trend.isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {trend.isPositive ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {trend.value}%
            </div>
          )}
        </div>
        {progress !== undefined && (
          <div className="mt-3">
            <Progress value={progress} className="h-1" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface MetricsPanelProps {
  dailySales?: string;
  totalInventory?: string;
  profitMargin?: string;
  salesGrowth?: number;
  inventoryValue?: string;
}

const MetricsPanel = ({
  dailySales = "₹2,450",
  totalInventory = "1,234",
  profitMargin = "32%",
  salesGrowth = 12.5,
  inventoryValue = "₹45,670",
}: MetricsPanelProps) => {
  const metrics = [
    {
      title: "Daily Sales",
      value: dailySales,
      description: "Today's revenue",
      icon: <DollarSign className="h-4 w-4" />,
      trend: { value: salesGrowth, isPositive: salesGrowth > 0 },
      progress: 75,
    },
    {
      title: "Total Inventory",
      value: totalInventory,
      description: "Items in stock",
      icon: <Package className="h-4 w-4" />,
      progress: 60,
    },
    {
      title: "Profit Margin",
      value: profitMargin,
      description: "Current average",
      icon: <TrendingUp className="h-4 w-4" />,
      trend: { value: 3.2, isPositive: true },
      progress: 32,
    },
    {
      title: "Inventory Value",
      value: inventoryValue,
      description: "Total stock value",
      icon: <ShoppingCart className="h-4 w-4" />,
      progress: 85,
    },
  ];

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Business Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default MetricsPanel;
