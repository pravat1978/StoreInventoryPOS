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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "./InventoryTable";

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  barcode?: string;
  attributes: {
    size?: string;
    color?: string;
    material?: string;
    style?: string;
    [key: string]: string | undefined;
  };
  price: number;
  cost: number;
  stockLevel: number;
  lowStockThreshold: number;
  isActive: boolean;
}

const variantSchema = z.object({
  sku: z.string().min(2, { message: "SKU is required" }),
  barcode: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  material: z.string().optional(),
  style: z.string().optional(),
  price: z.coerce
    .number()
    .min(0.01, { message: "Price must be greater than 0" }),
  cost: z.coerce.number().min(0.01, { message: "Cost must be greater than 0" }),
  stockLevel: z.coerce
    .number()
    .min(0, { message: "Stock level cannot be negative" }),
  lowStockThreshold: z.coerce
    .number()
    .min(1, { message: "Threshold must be at least 1" }),
  isActive: z.boolean().default(true),
});

type ProductVariantFormValues = z.infer<typeof variantSchema>;

interface ProductVariantFormProps {
  product: Product;
  variant?: ProductVariant;
  onSubmit: (data: ProductVariantFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const ProductVariantForm = ({
  product,
  variant,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ProductVariantFormProps) => {
  const isEditing = !!variant;

  const defaultValues: Partial<ProductVariantFormValues> = {
    sku:
      variant?.sku || `${product.sku}-VAR-${Date.now().toString().slice(-4)}`,
    barcode: variant?.barcode || "",
    size: variant?.attributes.size || "",
    color: variant?.attributes.color || "",
    material: variant?.attributes.material || "",
    style: variant?.attributes.style || "",
    price: variant?.price || product.price,
    cost: variant?.cost || product.cost,
    stockLevel: variant?.stockLevel ?? 0,
    lowStockThreshold: variant?.lowStockThreshold || product.lowStockThreshold,
    isActive: variant?.isActive ?? true,
  };

  const form = useForm<ProductVariantFormValues>({
    resolver: zodResolver(variantSchema),
    defaultValues,
  });

  const handleSubmit = (data: ProductVariantFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="p-4 bg-muted rounded-md">
          <h3 className="font-medium">Parent Product</h3>
          <p className="text-sm mt-1">
            <span className="font-medium">Name:</span> {product.name}
          </p>
          <p className="text-sm">
            <span className="font-medium">SKU:</span> {product.sku}
          </p>
          <p className="text-sm">
            <span className="font-medium">Category:</span> {product.category}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SKU" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Barcode (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter barcode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {product.category === "apparel" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter size" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter color" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Material (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter material" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Style (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter style" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="material"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter material" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Style (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter style" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="stockLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Level</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lowStockThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Low Stock Threshold</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Active Variant</FormLabel>
                    <FormDescription>
                      Inactive variants won't appear in selection lists
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
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
            {isSubmitting
              ? "Saving..."
              : isEditing
                ? "Update Variant"
                : "Add Variant"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductVariantForm;
