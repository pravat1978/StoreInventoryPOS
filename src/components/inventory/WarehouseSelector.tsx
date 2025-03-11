import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2 } from "lucide-react";

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  isDefault?: boolean;
}

interface WarehouseSelectorProps {
  warehouses: Warehouse[];
  selectedWarehouseId: string;
  onWarehouseChange: (warehouseId: string) => void;
  className?: string;
}

const WarehouseSelector = ({
  warehouses = [],
  selectedWarehouseId,
  onWarehouseChange,
  className = "",
}: WarehouseSelectorProps) => {
  // Find the selected warehouse
  const selectedWarehouse =
    warehouses.find((w) => w.id === selectedWarehouseId) || warehouses[0];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Building2 className="h-4 w-4 text-muted-foreground" />
      <Select value={selectedWarehouseId} onValueChange={onWarehouseChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select warehouse" />
        </SelectTrigger>
        <SelectContent>
          {warehouses.map((warehouse) => (
            <SelectItem key={warehouse.id} value={warehouse.id}>
              {warehouse.name} {warehouse.isDefault && "(Default)"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedWarehouse && (
        <span className="text-xs text-muted-foreground">
          {selectedWarehouse.location}
        </span>
      )}
    </div>
  );
};

export default WarehouseSelector;
