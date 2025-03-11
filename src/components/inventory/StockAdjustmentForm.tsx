import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "./InventoryTable";
import { Warehouse } from "./WarehouseSelector";

const adjustmentSchema = z.object({
  quantity: z.coerce.number().int(),
  adjustmentType: z.enum(["add", "remove"]),
  reason: z.enum([
    "purchase",
    "sale",
    "return",
    "damage",
    "loss",
    "correction",
    "transfer",
    "other",
  ]),
  notes: z.string().optional(),
  warehouseId: z.string(),
  targetWarehouseId: z.string().optional(),
});

type StockAdjustmentFormValues = z.infer<typeof adjustmentSchema>;

interface StockAdjustmentFormProps {
  product: Product;
  warehouses: Warehouse[];
  selectedWarehouseId: string;
  onSubmit: (data: StockAdjustmentFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const StockAdjustmentForm = ({
  product,
  warehouses,
  selectedWarehouseId,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: StockAdjustmentFormProps) => {
  const defaultValues: StockAdjustmentFormValues = {
    quantity: 1,
    adjustmentType: "add",
    reason: "purchase",
    notes: "",
    warehouseId: selectedWarehouseId,
    targetWarehouseId: "",
  };

  const form = useForm<StockAdjustmentFormValues>({
    resolver: zodResolver(adjustmentSchema),
    defaultValues,
  });

  const watchReason = form.watch("reason");
  const watchAdjustmentType = form.watch("adjustmentType");

  const handleSubmit = (data: StockAdjustmentFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="p-4 bg-muted rounded-md">
          <h3 className="font-medium">Product Information</h3>
          <p className="text-sm mt-1">
            <span className="font-medium">Name:</span> {product.name}
          </p>
          <p className="text-sm">
            <span className="font-medium">SKU:</span> {product.sku}
          </p>
          <p className="text-sm">
            <span className="font-medium">Current Stock:</span>{" "}
            {product.stockLevel} units
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="adjustmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adjustment Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="add">Add Stock</SelectItem>
                    <SelectItem value="remove">Remove Stock</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} min="1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {watchAdjustmentType === "add" ? (
                    <>
                      <SelectItem value="purchase">New Purchase</SelectItem>
                      <SelectItem value="return">Customer Return</SelectItem>
                      <SelectItem value="transfer">
                        Warehouse Transfer
                      </SelectItem>
                      <SelectItem value="correction">
                        Inventory Correction
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="damage">Damaged/Defective</SelectItem>
                      <SelectItem value="loss">Lost/Stolen</SelectItem>
                      <SelectItem value="transfer">
                        Warehouse Transfer
                      </SelectItem>
                      <SelectItem value="correction">
                        Inventory Correction
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchReason === "transfer" && (
          <FormField
            control={form.control}
            name="targetWarehouseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Warehouse</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target warehouse" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {warehouses
                      .filter((w) => w.id !== selectedWarehouseId)
                      .map((warehouse) => (
                        <SelectItem key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the warehouse to transfer stock to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes about this adjustment"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Confirm Adjustment"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StockAdjustmentForm;
