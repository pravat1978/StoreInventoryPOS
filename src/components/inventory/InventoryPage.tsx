import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Package, AlertTriangle } from "lucide-react";
import InventoryTable, { Product } from "./InventoryTable";
import ProductForm from "./ProductForm";
import ProductDetails from "./ProductDetails";
import RestockForm from "./RestockForm";
import SideNav from "../navigation/SideNav";

// Mock data for initial products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Cotton T-Shirt",
    sku: "APP-TS-001",
    category: "apparel",
    price: 19.99,
    cost: 8.5,
    stockLevel: 25,
    lowStockThreshold: 10,
    attributes: {
      size: "M",
      color: "Blue",
    },
    supplier: {
      id: "s1",
      name: "Fashion Wholesale Inc.",
      contactInfo:
        "John Smith\nPhone: (555) 123-4567\nEmail: john@fashionwholesale.com",
    },
  },
  {
    id: "2",
    name: "Denim Jeans",
    sku: "APP-DJ-002",
    category: "apparel",
    price: 39.99,
    cost: 18.75,
    stockLevel: 8,
    lowStockThreshold: 10,
    attributes: {
      size: "32",
      color: "Dark Blue",
    },
    supplier: {
      id: "s1",
      name: "Fashion Wholesale Inc.",
      contactInfo:
        "John Smith\nPhone: (555) 123-4567\nEmail: john@fashionwholesale.com",
    },
  },
  {
    id: "3",
    name: "Acrylic Paint Set",
    sku: "CRF-AP-001",
    category: "craft",
    price: 24.99,
    cost: 12.5,
    stockLevel: 0,
    lowStockThreshold: 5,
    attributes: {
      type: "Paint",
      brand: "ArtistChoice",
    },
    supplier: {
      id: "s2",
      name: "Creative Supplies Co.",
      contactInfo:
        "Sarah Johnson\nPhone: (555) 987-6543\nEmail: sarah@creativesupplies.com",
    },
  },
  {
    id: "4",
    name: "Canvas (16x20)",
    sku: "CRF-CV-002",
    category: "craft",
    price: 8.5,
    cost: 3.25,
    stockLevel: 42,
    lowStockThreshold: 15,
    attributes: {
      type: "Canvas",
      brand: "ArtSupply",
    },
    supplier: {
      id: "s2",
      name: "Creative Supplies Co.",
      contactInfo:
        "Sarah Johnson\nPhone: (555) 987-6543\nEmail: sarah@creativesupplies.com",
    },
  },
  {
    id: "5",
    name: "Wool Sweater",
    sku: "APP-WS-003",
    category: "apparel",
    price: 49.99,
    cost: 22.5,
    stockLevel: 12,
    lowStockThreshold: 8,
    attributes: {
      size: "L",
      color: "Gray",
    },
    supplier: {
      id: "s3",
      name: "Winter Clothing Ltd.",
      contactInfo:
        "Michael Brown\nPhone: (555) 456-7890\nEmail: michael@winterclothing.com",
    },
  },
];

const InventoryPage = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRestockOpen, setIsRestockOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Count low stock items
  const lowStockCount = products.filter(
    (product) => product.stockLevel <= product.lowStockThreshold,
  ).length;

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
    setIsDetailsOpen(false);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  const handleRestock = (product: Product) => {
    setSelectedProduct(product);
    setIsRestockOpen(true);
    setIsDetailsOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete));
      setProductToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleFormSubmit = (data: any) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (selectedProduct) {
        // Update existing product
        const updatedProduct: Product = {
          ...selectedProduct,
          name: data.name,
          sku: data.sku,
          category: data.category,
          price: parseFloat(data.price),
          cost: parseFloat(data.cost),
          stockLevel: parseInt(data.stockLevel),
          lowStockThreshold: parseInt(data.lowStockThreshold),
          attributes: {
            size: data.category === "apparel" ? data.size : undefined,
            color: data.category === "apparel" ? data.color : undefined,
            type: data.category === "craft" ? data.type : undefined,
            brand: data.category === "craft" ? data.brand : undefined,
          },
          supplier: {
            id: data.supplierId || selectedProduct.supplier.id,
            name: data.supplierName,
            contactInfo: data.supplierContact,
          },
        };

        setProducts(
          products.map((product) =>
            product.id === selectedProduct.id ? updatedProduct : product,
          ),
        );
      } else {
        // Add new product
        const newProduct: Product = {
          id: `${Date.now()}`,
          name: data.name,
          sku: data.sku,
          category: data.category,
          price: parseFloat(data.price),
          cost: parseFloat(data.cost),
          stockLevel: parseInt(data.stockLevel),
          lowStockThreshold: parseInt(data.lowStockThreshold),
          attributes: {
            size: data.category === "apparel" ? data.size : undefined,
            color: data.category === "apparel" ? data.color : undefined,
            type: data.category === "craft" ? data.type : undefined,
            brand: data.category === "craft" ? data.brand : undefined,
          },
          supplier: {
            id: `s${Date.now()}`,
            name: data.supplierName,
            contactInfo: data.supplierContact,
          },
        };

        setProducts([...products, newProduct]);
      }

      setIsSubmitting(false);
      setIsFormOpen(false);
    }, 1000);
  };

  const handleRestockSubmit = (data: any) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (selectedProduct) {
        // Update product stock level
        const updatedProduct: Product = {
          ...selectedProduct,
          stockLevel: selectedProduct.stockLevel + parseInt(data.quantity),
        };

        setProducts(
          products.map((product) =>
            product.id === selectedProduct.id ? updatedProduct : product,
          ),
        );

        // In a real app, you would also create a purchase order record
        console.log("Restock order created:", {
          productId: selectedProduct.id,
          quantity: data.quantity,
          expectedDelivery: data.expectedDelivery,
          priority: data.priority,
          notes: data.orderNotes,
          supplier: selectedProduct.supplier,
        });
      }

      setIsSubmitting(false);
      setIsRestockOpen(false);
    }, 1000);
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
          activeItem="inventory"
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Inventory Management</h1>
              <p className="text-gray-500">
                Manage your store's product inventory
              </p>
            </div>
            <div className="flex items-center gap-4">
              {lowStockCount > 0 && (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-md">
                  <AlertTriangle className="h-5 w-5" />
                  <span>
                    {lowStockCount} item{lowStockCount !== 1 && "s"} low on
                    stock
                  </span>
                </div>
              )}
              <Button onClick={handleAddProduct}>
                <Plus className="h-4 w-4 mr-2" /> Add Product
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <InventoryTable
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>
      </div>

      {/* Product Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              {selectedProduct
                ? "Update the product details below."
                : "Fill in the product details below to add it to your inventory."}
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            product={selectedProduct || undefined}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Product Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl">
          {selectedProduct && (
            <ProductDetails
              product={selectedProduct}
              onEdit={handleEditProduct}
              onClose={() => setIsDetailsOpen(false)}
              onRestock={handleRestock}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Restock Form Dialog */}
      <Dialog open={isRestockOpen} onOpenChange={setIsRestockOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Restock Order</DialogTitle>
            <DialogDescription>
              Create a restock order for this product.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <RestockForm
              product={selectedProduct}
              onSubmit={handleRestockSubmit}
              onCancel={() => setIsRestockOpen(false)}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InventoryPage;
