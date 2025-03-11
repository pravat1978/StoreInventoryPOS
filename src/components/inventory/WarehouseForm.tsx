import React, { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import StaffForm from "./StaffForm";

export interface Warehouse {
  id: string;
  firmName: string;
  warehouseCode: string;
  warehouseName: string;
  warehouseAddress: string;
  warehouseIncharge: string;
  isDefault?: boolean;
  isActive?: boolean;
}

const warehouseSchema = z.object({
  firmName: z.string().min(1, { message: "Firm name is required" }),
  warehouseCode: z.string().min(1, { message: "Warehouse code is required" }),
  warehouseName: z.string().min(1, { message: "Warehouse name is required" }),
  warehouseAddress: z
    .string()
    .min(1, { message: "Warehouse address is required" }),
  warehouseIncharge: z
    .string()
    .min(1, { message: "Warehouse incharge is required" }),
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

type WarehouseFormValues = z.infer<typeof warehouseSchema>;

interface WarehouseFormProps {
  warehouse?: Warehouse;
  onSubmit: (data: WarehouseFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const WarehouseForm = ({
  warehouse,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: WarehouseFormProps) => {
  const isEditing = !!warehouse;
  const [showStaffForm, setShowStaffForm] = useState(false);

  const defaultValues: Partial<WarehouseFormValues> = {
    firmName: warehouse?.firmName || "",
    warehouseCode: warehouse?.warehouseCode || "",
    warehouseName: warehouse?.warehouseName || "",
    warehouseAddress: warehouse?.warehouseAddress || "",
    warehouseIncharge: warehouse?.warehouseIncharge || "",
    isDefault: warehouse?.isDefault || false,
    isActive: warehouse?.isActive ?? true,
  };

  const form = useForm<WarehouseFormValues>({
    resolver: zodResolver(warehouseSchema),
    defaultValues,
  });

  const handleSubmit = (data: WarehouseFormValues) => {
    onSubmit(data);
  };

  const handleAddIncharge = () => {
    setShowStaffForm(true);
  };

  const handleStaffSubmit = (data: any) => {
    console.log("New staff added:", data);
    // In a real app, you would save this data and update the incharge dropdown
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    form.setValue("warehouseIncharge", fullName);
    setShowStaffForm(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="firmName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firm Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter firm name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="warehouseCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warehouse Code*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter warehouse code" {...field} />
                    </FormControl>
                    <FormDescription>
                      A unique identifier for this warehouse
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="warehouseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warehouse Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter warehouse name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="warehouseAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warehouse Address*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter warehouse address"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="warehouseIncharge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warehouse Incharge*</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="-Select-" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PravatRana">PravatRana</SelectItem>
                        <SelectItem value="JohnSmith">John Smith</SelectItem>
                        <SelectItem value="SarahJohnson">
                          Sarah Johnson
                        </SelectItem>
                        <SelectItem value="MichaelBrown">
                          Michael Brown
                        </SelectItem>
                        <div className="border-t my-1 px-2 py-2">
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full flex items-center justify-center text-primary"
                            onClick={handleAddIncharge}
                          >
                            <Plus className="h-4 w-4 mr-2" /> Add Incharge
                          </Button>
                        </div>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Person responsible for this warehouse
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4 pt-4">
                <FormField
                  control={form.control}
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Default Warehouse</FormLabel>
                        <FormDescription>
                          Set as the default warehouse for new inventory
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Active Status</FormLabel>
                        <FormDescription>
                          Inactive warehouses won't appear in selection lists
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
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
                  ? "Update Warehouse"
                  : "Add Warehouse"}
            </Button>
          </div>
        </form>
      </Form>

      <StaffForm
        open={showStaffForm}
        onClose={() => setShowStaffForm(false)}
        onSubmit={handleStaffSubmit}
        warehouses={[
          { id: "1", code: "WH-001", name: "Main Warehouse" },
          { id: "2", code: "ST-001", name: "Downtown Store" },
          { id: "3", code: "ST-002", name: "East Side Location" },
        ]}
      />
    </>
  );
};

export default WarehouseForm;
