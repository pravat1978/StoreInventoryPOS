import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface SalesDataPoint {
  date: string;
  sales: number;
  profit: number;
}

interface SalesChartProps {
  data?: SalesDataPoint[];
  title?: string;
  description?: string;
}

const mockDailyData: SalesDataPoint[] = [
  { date: "Mon", sales: 1200, profit: 420 },
  { date: "Tue", sales: 1800, profit: 630 },
  { date: "Wed", sales: 1400, profit: 490 },
  { date: "Thu", sales: 2200, profit: 770 },
  { date: "Fri", sales: 2600, profit: 910 },
  { date: "Sat", sales: 3100, profit: 1085 },
  { date: "Sun", sales: 2400, profit: 840 },
];

const mockWeeklyData: SalesDataPoint[] = [
  { date: "Week 1", sales: 12000, profit: 4200 },
  { date: "Week 2", sales: 14500, profit: 5075 },
  { date: "Week 3", sales: 16800, profit: 5880 },
  { date: "Week 4", sales: 15200, profit: 5320 },
];

const mockMonthlyData: SalesDataPoint[] = [
  { date: "Jan", sales: 45000, profit: 15750 },
  { date: "Feb", sales: 52000, profit: 18200 },
  { date: "Mar", sales: 49000, profit: 17150 },
  { date: "Apr", sales: 58000, profit: 20300 },
  { date: "May", sales: 63000, profit: 22050 },
  { date: "Jun", sales: 59000, profit: 20650 },
];

const SalesChart = ({
  data = mockDailyData,
  title = "Sales Performance",
  description = "View your sales performance over time",
}: SalesChartProps) => {
  const [timeRange, setTimeRange] = useState("daily");
  const [chartData, setChartData] = useState<SalesDataPoint[]>(mockDailyData);
  const [dataType, setDataType] = useState("sales");

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    switch (value) {
      case "daily":
        setChartData(mockDailyData);
        break;
      case "weekly":
        setChartData(mockWeeklyData);
        break;
      case "monthly":
        setChartData(mockMonthlyData);
        break;
      default:
        setChartData(mockDailyData);
    }
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={dataType} onValueChange={setDataType}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Data Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="profit">Profit</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="daily"
          value={timeRange}
          onValueChange={handleTimeRangeChange}
        >
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="daily" className="space-y-4">
            <ChartDisplay data={chartData} dataType={dataType} />
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <ChartDisplay data={chartData} dataType={dataType} />
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <ChartDisplay data={chartData} dataType={dataType} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface ChartDisplayProps {
  data: SalesDataPoint[];
  dataType: string;
}

const ChartDisplay = ({ data, dataType }: ChartDisplayProps) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" stroke="#888888" />
          <YAxis stroke="#888888" />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
            labelStyle={{ fontWeight: "bold" }}
          />
          <Legend />
          {(dataType === "sales" || dataType === "both") && (
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Sales ($)"
            />
          )}
          {(dataType === "profit" || dataType === "both") && (
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Profit ($)"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
