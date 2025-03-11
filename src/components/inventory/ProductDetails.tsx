import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "./InventoryTable";
import { AlertTriangle, Edit, Package, Truck } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
  onEdit: (product: Product) => void;
  onClose: () => void;
  onRestock: (product: Product) => void;
}

const ProductDetails = ({
  product,
  onEdit,
  onClose,
  onRestock,
}: ProductDetailsProps) => {
  const isLowStock = product.stockLevel <= product.lowStockThreshold;
  const isOutOfStock = product.stockLevel === 0;

  const getStockStatusBadge = () => {
    if (isOutOfStock) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" /> Out of Stock
        </Badge>
      );
    } else if (isLowStock) {
      return (
        <Badge
          variant="warning"
          className="bg-amber-500 flex items-center gap-1"
        >
          <AlertTriangle className="h-3 w-3" /> Low Stock
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="text-green-600 border-green-600">
          In Stock
        </Badge>
      );
    }
  };

  const getAttributeSection = () => {
    if (product.category === "apparel") {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Size</h4>
            <p>{product.attributes.size || "N/A"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Color</h4>
            <p>{product.attributes.color || "N/A"}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
            <p>{product.attributes.type || "N/A"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Brand</h4>
            <p>{product.attributes.brand || "N/A"}</p>
          </div>
        </div>
      );
    }
  };

  const calculateProfit = () => {
    const profit = product.price - product.cost;
    const marginPercent = (profit / product.price) * 100;
    return {
      profit: profit.toFixed(2),
      marginPercent: marginPercent.toFixed(1),
    };
  };

  const { profit, marginPercent } = calculateProfit();

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{product.name}</CardTitle>
            <CardDescription>SKU: {product.sku}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {product.category}
            </Badge>
            {getStockStatusBadge()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Package className="h-5 w-5" /> Product Information
              </h3>
              <Separator className="my-2" />
              {getAttributeSection()}
            </div>

            <div>
              <h3 className="text-lg font-medium mt-4">Pricing</h3>
              <Separator className="my-2" />
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Price
                  </h4>
                  <p className="font-medium">₹{product.price.toFixed(2)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Cost
                  </h4>
                  <p>₹{product.cost.toFixed(2)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Profit
                  </h4>
                  <p className="text-green-600">
                    ₹{profit} ({marginPercent}%)
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mt-4">Inventory</h3>
              <Separator className="my-2" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Current Stock
                  </h4>
                  <p className={isLowStock ? "text-amber-500 font-bold" : ""}>
                    {product.stockLevel} units
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Low Stock Threshold
                  </h4>
                  <p>{product.lowStockThreshold} units</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Truck className="h-5 w-5" /> Supplier Information
              </h3>
              <Separator className="my-2" />
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Supplier Name
                  </h4>
                  <p>{product.supplier.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Contact Information
                  </h4>
                  <p className="whitespace-pre-line">
                    {product.supplier.contactInfo}
                  </p>
                </div>
              </div>
            </div>

            {(isLowStock || isOutOfStock) && (
              <div className="mt-6 p-4 border border-amber-200 bg-amber-50 rounded-md">
                <h4 className="font-medium flex items-center gap-2 text-amber-800">
                  <AlertTriangle className="h-4 w-4" />
                  {isOutOfStock ? "Restock Required" : "Low Stock Alert"}
                </h4>
                <p className="text-sm text-amber-700 mt-1">
                  {isOutOfStock
                    ? "This product is out of stock. Please restock as soon as possible."
                    : `Only ${product.stockLevel} units remaining. Consider restocking soon.`}
                </p>
                <Button
                  className="mt-2 bg-amber-600 hover:bg-amber-700"
                  onClick={() => onRestock(product)}
                >
                  Order Restock
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4 border-t pt-6">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={() => onEdit(product)}>
          <Edit className="h-4 w-4 mr-2" /> Edit Product
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductDetails;
