import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Tag, Percent, Gift, ChevronRight } from "lucide-react";

interface Promotion {
  id: string;
  title: string;
  type: "discount" | "bundle" | "loyalty";
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "expired";
}

interface PromotionsPreviewProps {
  promotions?: Promotion[];
  onViewAll?: () => void;
  onViewPromotion?: (id: string) => void;
}

const PromotionsPreview = ({
  promotions = [
    {
      id: "1",
      title: "Summer Sale",
      type: "discount",
      description: "20% off all summer apparel",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      status: "active",
    },
    {
      id: "2",
      title: "Art Supplies Bundle",
      type: "bundle",
      description: "Buy 3 art supplies, get 1 free",
      startDate: "2023-07-15",
      endDate: "2023-09-15",
      status: "active",
    },
    {
      id: "3",
      title: "Fall Collection Preview",
      type: "discount",
      description: "15% off pre-orders",
      startDate: "2023-09-01",
      endDate: "2023-09-30",
      status: "upcoming",
    },
  ],
  onViewAll = () => {},
  onViewPromotion = () => {},
}: PromotionsPreviewProps) => {
  const getPromotionIcon = (type: Promotion["type"]) => {
    switch (type) {
      case "discount":
        return <Percent className="h-4 w-4" />;
      case "bundle":
        return <Gift className="h-4 w-4" />;
      case "loyalty":
        return <Tag className="h-4 w-4" />;
      default:
        return <Percent className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: Promotion["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "upcoming":
        return <Badge variant="secondary">Upcoming</Badge>;
      case "expired":
        return <Badge variant="outline">Expired</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Promotions</CardTitle>
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Active and upcoming promotional campaigns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {promotions.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">
              No active promotions
            </p>
          ) : (
            promotions.map((promotion) => (
              <div
                key={promotion.id}
                className="flex items-start p-3 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => onViewPromotion(promotion.id)}
              >
                <div className="mr-3 mt-0.5">
                  {getPromotionIcon(promotion.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{promotion.title}</h4>
                    {getStatusBadge(promotion.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {promotion.description}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    <span>
                      {formatDate(promotion.startDate)} -{" "}
                      {formatDate(promotion.endDate)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onViewAll}
        >
          Manage Promotions
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromotionsPreview;
