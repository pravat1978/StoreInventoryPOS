import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash2, AlertTriangle } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: "apparel" | "craft";
  price: number;
  cost: number;
  stockLevel: number;
  lowStockThreshold: number;
  attributes: {
    size?: string;
    color?: string;
    type?: string;
    brand?: string;
  };
  supplier: {
    id: string;
    name: string;
    contactInfo: string;
  };
}

interface InventoryTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onViewDetails: (product: Product) => void;
}

const InventoryTable = ({
  products = [],
  onEdit = () => {},
  onDelete = () => {},
  onViewDetails = () => {},
}: InventoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [stockFilter, setStockFilter] = useState<string | null>(null);

  // Filter products based on search term and filters
  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategory =
      categoryFilter === null || product.category === categoryFilter;

    // Stock level filter
    const matchesStock =
      stockFilter === null ||
      (stockFilter === "low" &&
        product.stockLevel <= product.lowStockThreshold) ||
      (stockFilter === "out" && product.stockLevel === 0) ||
      (stockFilter === "in" &&
        product.stockLevel > 0 &&
        product.stockLevel > product.lowStockThreshold);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const getStockStatusBadge = (product: Product) => {
    if (product.stockLevel === 0) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" /> Out of Stock
        </Badge>
      );
    } else if (product.stockLevel <= product.lowStockThreshold) {
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

  const getAttributeText = (product: Product) => {
    if (product.category === "apparel") {
      return `${product.attributes.size || ""} / ${product.attributes.color || ""}`.trim();
    } else {
      return `${product.attributes.brand || ""} / ${product.attributes.type || ""}`.trim();
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={categoryFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter(null)}
          >
            All Categories
          </Button>
          <Button
            variant={categoryFilter === "apparel" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter("apparel")}
          >
            Apparel
          </Button>
          <Button
            variant={categoryFilter === "craft" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter("craft")}
          >
            Art & Craft
          </Button>
          <Button
            variant={stockFilter === "low" ? "default" : "outline"}
            size="sm"
            onClick={() => setStockFilter(stockFilter === "low" ? null : "low")}
          >
            Low Stock
          </Button>
          <Button
            variant={stockFilter === "out" ? "default" : "outline"}
            size="sm"
            onClick={() => setStockFilter(stockFilter === "out" ? null : "out")}
          >
            Out of Stock
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Attributes</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onViewDetails(product)}
                >
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{getAttributeText(product)}</TableCell>
                  <TableCell className="text-right">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.stockLevel}
                  </TableCell>
                  <TableCell>{getStockStatusBadge(product)}</TableCell>
                  <TableCell>{product.supplier.name}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(product);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(product.id);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-24 text-center text-muted-foreground"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryTable;
