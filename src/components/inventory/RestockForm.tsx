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

const restockSchema = z.object({
  quantity: z.coerce
    .number()
    .min(1, { message: "Quantity must be at least 1" }),
  expectedDelivery: z.string().min(1, {
    message: "Expected delivery date is required",
  }),
  orderNotes: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
});

type RestockFormValues = z.infer<typeof restockSchema>;

interface RestockFormProps {
  product: Product;
  onSubmit: (data: RestockFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const RestockForm = ({
  product,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: RestockFormProps) => {
  const defaultValues: RestockFormValues = {
    quantity: product.lowStockThreshold * 2,
    expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    orderNotes: "",
    priority: product.stockLevel === 0 ? "high" : "medium",
  };

  const form = useForm<RestockFormValues>({
    resolver: zodResolver(restockSchema),
    defaultValues,
  });

  const handleSubmit = (data: RestockFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
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
            <p className="text-sm">
              <span className="font-medium">Supplier:</span>{" "}
              {product.supplier.name}
            </p>
          </div>

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity to Order</FormLabel>
                <FormControl>
                  <Input type="number" {...field} min={1} />
                </FormControl>
                <FormDescription>
                  Recommended: {product.lowStockThreshold * 2} units
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expectedDelivery"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Delivery Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="orderNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any special instructions or notes for this order"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
            {isSubmitting ? "Submitting..." : "Submit Restock Order"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RestockForm;
