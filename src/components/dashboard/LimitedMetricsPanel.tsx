import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircle, DollarSign, Target, Users } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
}

const MetricCard = ({
  title = "Metric",
  value = "₹0",
  description = "No data available",
  icon = <DollarSign className="h-5 w-5 text-muted-foreground" />,
  trend = "",
  trendDirection = "neutral",
}: MetricCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted/20 p-1.5 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div
            className={`flex items-center mt-2 text-xs ${trendDirection === "up" ? "text-green-500" : trendDirection === "down" ? "text-red-500" : "text-gray-500"}`}
          >
            {trendDirection === "up"
              ? "↑"
              : trendDirection === "down"
                ? "↓"
                : "→"}{" "}
            {trend}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface LimitedMetricsPanelProps {
  dailySales?: string;
  salesGoal?: string;
  customerCount?: string;
  activePromotions?: string;
}

const LimitedMetricsPanel = ({
  dailySales = "₹1,245.89",
  salesGoal = "₹2,000.00",
  customerCount = "37",
  activePromotions = "3",
}: LimitedMetricsPanelProps) => {
  // Calculate percentage of goal reached
  const salesValue = parseFloat(dailySales.replace(/[^0-9.-]+/g, ""));
  const goalValue = parseFloat(salesGoal.replace(/[^0-9.-]+/g, ""));
  const percentComplete = Math.min(
    Math.round((salesValue / goalValue) * 100),
    100,
  );

  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Today's Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Daily Sales"
          value={dailySales}
          description={`${percentComplete}% of daily goal`}
          icon={<DollarSign className="h-5 w-5 text-blue-500" />}
          trend="+12.5% from yesterday"
          trendDirection="up"
        />

        <MetricCard
          title="Sales Goal"
          value={salesGoal}
          description={`${100 - percentComplete}% remaining`}
          icon={<Target className="h-5 w-5 text-purple-500" />}
        />

        <MetricCard
          title="Customers Today"
          value={customerCount}
          description="Total transactions processed"
          icon={<Users className="h-5 w-5 text-green-500" />}
          trend="+5 from yesterday"
          trendDirection="up"
        />

        <MetricCard
          title="Active Promotions"
          value={activePromotions}
          description="Currently running promotions"
          icon={<ArrowUpCircle className="h-5 w-5 text-orange-500" />}
        />
      </div>

      {/* Progress bar for daily goal */}
      <div className="mt-6 px-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Daily Sales Goal Progress</span>
          <span className="text-sm font-medium">{percentComplete}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${percentComplete}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LimitedMetricsPanel;
