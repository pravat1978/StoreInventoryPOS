import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Building,
  Phone,
  Mail,
  FileText,
  FolderTree,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import SideNav from "../navigation/SideNav";
import SupplierForm from "./SupplierForm";
import SupplierList from "./SupplierList";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";

const MasterDataPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("suppliers");
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [categorySheetOpen, setCategorySheetOpen] = useState(false);

  const handleSupplierSubmit = (data: any) => {
    console.log("Supplier data submitted:", data);
    setShowSupplierForm(false);
    setEditingSupplier(null);
    // In a real app, you would save this data to your backend
  };

  const handleCategorySubmit = (data: any) => {
    console.log("Category data submitted:", data);
    setShowCategoryForm(false);
    setCategoryDialogOpen(false);
    setCategorySheetOpen(false);
    setEditingCategory(null);
    // In a real app, you would save this data to your backend
  };

  const handleOpenCategoryDialog = (category = null) => {
    setEditingCategory(category);
    setCategoryDialogOpen(true);
  };

  const handleOpenCategorySheet = (category = null) => {
    setEditingCategory(category);
    setCategorySheetOpen(true);
    // Make sure the form is not shown in the main content area
    setShowCategoryForm(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out h-full ${sidebarCollapsed ? "w-20" : "w-64"}`}
      >
        <SideNav
          userName="Store Manager"
          userRole="manager"
          activeItem="masterdata"
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Master Data Management</h1>
              <p className="text-gray-500">
                Manage your store's master data including suppliers, customers,
                and more
              </p>
            </div>
            <div>
              {activeTab === "suppliers" && (
                <Button onClick={() => setShowSupplierForm(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add New Supplier
                </Button>
              )}
              {activeTab === "categories" && (
                <Button onClick={() => handleOpenCategorySheet()}>
                  <Plus className="mr-2 h-4 w-4" /> Add New Category
                </Button>
              )}
            </div>
          </div>

          {showSupplierForm || showCategoryForm ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {showSupplierForm
                    ? editingSupplier
                      ? "Edit Supplier"
                      : "Add New Supplier"
                    : editingCategory
                      ? "Edit Category"
                      : "Add New Category"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showSupplierForm ? (
                  <SupplierForm
                    supplier={editingSupplier}
                    onSubmit={handleSupplierSubmit}
                    onCancel={() => {
                      setShowSupplierForm(false);
                      setEditingSupplier(null);
                    }}
                  />
                ) : (
                  <CategoryForm
                    category={editingCategory}
                    onSubmit={handleCategorySubmit}
                    onCancel={() => {
                      setShowCategoryForm(false);
                      setEditingCategory(null);
                    }}
                  />
                )}
              </CardContent>
            </Card>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>

              <TabsContent value="suppliers" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Supplier List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SupplierList
                      onEdit={(supplier) => {
                        setEditingSupplier(supplier);
                        setShowSupplierForm(true);
                      }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="customers" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-md">
                      <p className="text-muted-foreground">
                        Customer management module coming soon
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Master Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-md">
                      <p className="text-muted-foreground">
                        Product master data module coming soon
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CategoryList
                      onEdit={(category) => handleOpenCategorySheet(category)}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>

      {/* Category Dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <CategoryForm
            category={editingCategory}
            categories={[
              {
                id: "1",
                name: "Apparel",
                code: "CAT-APP",
                description: "All clothing and wearable items",
              },
              {
                id: "4",
                name: "Art & Craft",
                code: "CAT-ART",
                description: "Art supplies and craft materials",
              },
              {
                id: "7",
                name: "Seasonal",
                code: "CAT-SEA",
                description: "Seasonal items and collections",
              },
            ]}
            onSubmit={handleCategorySubmit}
            onCancel={() => {
              setCategoryDialogOpen(false);
              setEditingCategory(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Category Slide-in Sheet */}
      <Sheet open={categorySheetOpen} onOpenChange={setCategorySheetOpen}>
        <SheetContent className="w-[500px] sm:w-[600px] overflow-y-auto">
          <SheetHeader className="flex justify-between items-center pr-10">
            <SheetTitle>
              {editingCategory ? "Edit Category" : "Add New Category"}
            </SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="mt-6">
            <CategoryForm
              category={editingCategory}
              categories={[
                {
                  id: "1",
                  name: "Apparel",
                  code: "CAT-APP",
                  description: "All clothing and wearable items",
                },
                {
                  id: "4",
                  name: "Art & Craft",
                  code: "CAT-ART",
                  description: "Art supplies and craft materials",
                },
                {
                  id: "7",
                  name: "Seasonal",
                  code: "CAT-SEA",
                  description: "Seasonal items and collections",
                },
              ]}
              onSubmit={handleCategorySubmit}
              onCancel={() => {
                setCategorySheetOpen(false);
                setEditingCategory(null);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MasterDataPage;
