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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Package,
  AlertTriangle,
  Truck,
  BarChart,
  FileText,
  Warehouse as WarehouseIcon,
  Upload,
  Tag,
  Layers,
} from "lucide-react";
import InventoryTable, { Product } from "./InventoryTable";
import ProductForm from "./ProductForm";
import ProductDetails from "./ProductDetails";
import RestockForm from "./RestockForm";
import SideNav from "../navigation/SideNav";
import WarehouseSelector, { Warehouse } from "./WarehouseSelector";
import StockAdjustmentForm from "./StockAdjustmentForm";
import SupplierForm, { Supplier } from "./SupplierForm";
import PurchaseOrderForm from "./PurchaseOrderForm";
import ProductVariantForm, { ProductVariant } from "./ProductVariantForm";
import ProductImageUpload, { ProductImage } from "./ProductImageUpload";

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

// Mock data for warehouses
const mockWarehouses: Warehouse[] = [
  {
    id: "w1",
    name: "Main Warehouse",
    location: "123 Main St, Anytown, USA",
    isDefault: true,
  },
  {
    id: "w2",
    name: "Downtown Store",
    location: "456 Market St, Anytown, USA",
  },
  {
    id: "w3",
    name: "East Side Location",
    location: "789 East Blvd, Anytown, USA",
  },
];

// Mock data for suppliers
const mockSuppliers: Supplier[] = [
  {
    id: "s1",
    name: "Fashion Wholesale Inc.",
    contactPerson: "John Smith",
    email: "john@fashionwholesale.com",
    phone: "(555) 123-4567",
    address: "100 Fashion Ave, New York, NY 10001",
    leadTime: 7,
    paymentTerms: "Net 30",
    isActive: true,
  },
  {
    id: "s2",
    name: "Creative Supplies Co.",
    contactPerson: "Sarah Johnson",
    email: "sarah@creativesupplies.com",
    phone: "(555) 987-6543",
    address: "200 Art Street, Portland, OR 97201",
    leadTime: 5,
    paymentTerms: "Net 15",
    isActive: true,
  },
  {
    id: "s3",
    name: "Winter Clothing Ltd.",
    contactPerson: "Michael Brown",
    email: "michael@winterclothing.com",
    phone: "(555) 456-7890",
    address: "300 Cold Lane, Minneapolis, MN 55401",
    leadTime: 10,
    paymentTerms: "Net 45",
    isActive: true,
  },
];

// Mock data for product variants
const mockVariants: Record<string, ProductVariant[]> = {
  "1": [
    {
      id: "v1",
      productId: "1",
      sku: "APP-TS-001-S-BLU",
      barcode: "123456789012",
      attributes: {
        size: "S",
        color: "Blue",
      },
      price: 19.99,
      cost: 8.5,
      stockLevel: 15,
      lowStockThreshold: 5,
      isActive: true,
    },
    {
      id: "v2",
      productId: "1",
      sku: "APP-TS-001-M-BLU",
      barcode: "123456789013",
      attributes: {
        size: "M",
        color: "Blue",
      },
      price: 19.99,
      cost: 8.5,
      stockLevel: 10,
      lowStockThreshold: 5,
      isActive: true,
    },
    {
      id: "v3",
      productId: "1",
      sku: "APP-TS-001-L-BLU",
      barcode: "123456789014",
      attributes: {
        size: "L",
        color: "Blue",
      },
      price: 19.99,
      cost: 8.5,
      stockLevel: 8,
      lowStockThreshold: 5,
      isActive: true,
    },
    {
      id: "v4",
      productId: "1",
      sku: "APP-TS-001-M-RED",
      barcode: "123456789015",
      attributes: {
        size: "M",
        color: "Red",
      },
      price: 19.99,
      cost: 8.5,
      stockLevel: 12,
      lowStockThreshold: 5,
      isActive: true,
    },
  ],
};

const InventoryPage = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [warehouses, setWarehouses] = useState<Warehouse[]>(mockWarehouses);
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [variants, setVariants] =
    useState<Record<string, ProductVariant[]>>(mockVariants);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(
    warehouses[0]?.id || "",
  );

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRestockOpen, setIsRestockOpen] = useState(false);
  const [isAdjustmentOpen, setIsAdjustmentOpen] = useState(false);
  const [isSupplierFormOpen, setIsSupplierFormOpen] = useState(false);
  const [isPurchaseOrderOpen, setIsPurchaseOrderOpen] = useState(false);
  const [isVariantFormOpen, setIsVariantFormOpen] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [productImages, setProductImages] = useState<
    Record<string, ProductImage[]>
  >({});

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

  const handleAdjustStock = (product: Product) => {
    setSelectedProduct(product);
    setIsAdjustmentOpen(true);
  };

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    setIsSupplierFormOpen(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsSupplierFormOpen(true);
  };

  const handleCreatePurchaseOrder = () => {
    setIsPurchaseOrderOpen(true);
  };

  const handleAddVariant = (product: Product) => {
    setSelectedProduct(product);
    setSelectedVariant(null);
    setIsVariantFormOpen(true);
  };

  const handleEditVariant = (variant: ProductVariant) => {
    const product = products.find((p) => p.id === variant.productId);
    if (product) {
      setSelectedProduct(product);
      setSelectedVariant(variant);
      setIsVariantFormOpen(true);
    }
  };

  const handleManageImages = (product: Product) => {
    setSelectedProduct(product);
    setIsImageUploadOpen(true);
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

  const handleAdjustmentSubmit = (data: any) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (selectedProduct) {
        let newStockLevel = selectedProduct.stockLevel;

        if (data.adjustmentType === "add") {
          newStockLevel += parseInt(data.quantity);
        } else {
          newStockLevel = Math.max(0, newStockLevel - parseInt(data.quantity));
        }

        // Update product stock level
        const updatedProduct: Product = {
          ...selectedProduct,
          stockLevel: newStockLevel,
        };

        setProducts(
          products.map((product) =>
            product.id === selectedProduct.id ? updatedProduct : product,
          ),
        );

        // In a real app, you would also create a stock adjustment record
        console.log("Stock adjustment created:", {
          productId: selectedProduct.id,
          adjustmentType: data.adjustmentType,
          quantity: data.quantity,
          reason: data.reason,
          notes: data.notes,
          warehouseId: data.warehouseId,
          targetWarehouseId: data.targetWarehouseId,
        });
      }

      setIsSubmitting(false);
      setIsAdjustmentOpen(false);
    }, 1000);
  };

  const handleSupplierFormSubmit = (data: any) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (selectedSupplier) {
        // Update existing supplier
        const updatedSupplier: Supplier = {
          ...selectedSupplier,
          ...data,
        };

        setSuppliers(
          suppliers.map((supplier) =>
            supplier.id === selectedSupplier.id ? updatedSupplier : supplier,
          ),
        );
      } else {
        // Add new supplier
        const newSupplier: Supplier = {
          id: `s${Date.now()}`,
          ...data,
        };

        setSuppliers([...suppliers, newSupplier]);
      }

      setIsSubmitting(false);
      setIsSupplierFormOpen(false);
    }, 1000);
  };

  const handlePurchaseOrderSubmit = (data: any, items: any[]) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Purchase order created:", { ...data, items });

      // In a real app, you would create a purchase order record
      // and potentially update stock levels when the order is received

      setIsSubmitting(false);
      setIsPurchaseOrderOpen(false);
    }, 1000);
  };

  const handleVariantFormSubmit = (data: any) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (selectedProduct) {
        const productId = selectedProduct.id;
        const productVariants = variants[productId] || [];

        if (selectedVariant) {
          // Update existing variant
          const updatedVariant: ProductVariant = {
            ...selectedVariant,
            sku: data.sku,
            barcode: data.barcode,
            attributes: {
              size: data.size,
              color: data.color,
              material: data.material,
              style: data.style,
            },
            price: parseFloat(data.price),
            cost: parseFloat(data.cost),
            stockLevel: parseInt(data.stockLevel),
            lowStockThreshold: parseInt(data.lowStockThreshold),
            isActive: data.isActive,
          };

          const updatedVariants = productVariants.map((variant) =>
            variant.id === selectedVariant.id ? updatedVariant : variant,
          );

          setVariants({
            ...variants,
            [productId]: updatedVariants,
          });
        } else {
          // Add new variant
          const newVariant: ProductVariant = {
            id: `v${Date.now()}`,
            productId,
            sku: data.sku,
            barcode: data.barcode,
            attributes: {
              size: data.size,
              color: data.color,
              material: data.material,
              style: data.style,
            },
            price: parseFloat(data.price),
            cost: parseFloat(data.cost),
            stockLevel: parseInt(data.stockLevel),
            lowStockThreshold: parseInt(data.lowStockThreshold),
            isActive: data.isActive,
          };

          setVariants({
            ...variants,
            [productId]: [...productVariants, newVariant],
          });
        }
      }

      setIsSubmitting(false);
      setIsVariantFormOpen(false);
    }, 1000);
  };

  const handleImageUploadSubmit = (images: ProductImage[]) => {
    if (selectedProduct) {
      setProductImages({
        ...productImages,
        [selectedProduct.id]: images,
      });
      setIsImageUploadOpen(false);
    }
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

      {/* Stock Adjustment Dialog */}
      <Dialog open={isAdjustmentOpen} onOpenChange={setIsAdjustmentOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Adjust Stock</DialogTitle>
            <DialogDescription>
              Add or remove stock for this product.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <StockAdjustmentForm
              product={selectedProduct}
              warehouses={warehouses}
              selectedWarehouseId={selectedWarehouseId}
              onSubmit={handleAdjustmentSubmit}
              onCancel={() => setIsAdjustmentOpen(false)}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Supplier Form Dialog */}
      <Dialog open={isSupplierFormOpen} onOpenChange={setIsSupplierFormOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedSupplier ? "Edit Supplier" : "Add New Supplier"}
            </DialogTitle>
            <DialogDescription>
              {selectedSupplier
                ? "Update the supplier details below."
                : "Fill in the supplier details below to add it to your system."}
            </DialogDescription>
          </DialogHeader>
          <SupplierForm
            supplier={selectedSupplier || undefined}
            onSubmit={handleSupplierFormSubmit}
            onCancel={() => setIsSupplierFormOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Purchase Order Dialog */}
      <Dialog open={isPurchaseOrderOpen} onOpenChange={setIsPurchaseOrderOpen}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
            <DialogDescription>
              Create a new purchase order to restock your inventory.
            </DialogDescription>
          </DialogHeader>
          <PurchaseOrderForm
            suppliers={suppliers}
            products={products}
            warehouses={warehouses}
            onSubmit={handlePurchaseOrderSubmit}
            onCancel={() => setIsPurchaseOrderOpen(false)}
            isSubmitting={isSubmitting}
            initialWarehouseId={selectedWarehouseId}
          />
        </DialogContent>
      </Dialog>

      {/* Product Variant Dialog */}
      <Dialog open={isVariantFormOpen} onOpenChange={setIsVariantFormOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedVariant ? "Edit Variant" : "Add Product Variant"}
            </DialogTitle>
            <DialogDescription>
              {selectedVariant
                ? "Update the variant details below."
                : "Create a new variant for this product."}
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <ProductVariantForm
              product={selectedProduct}
              variant={selectedVariant || undefined}
              onSubmit={handleVariantFormSubmit}
              onCancel={() => setIsVariantFormOpen(false)}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Image Upload Dialog */}
      <Dialog open={isImageUploadOpen} onOpenChange={setIsImageUploadOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Manage Product Images</DialogTitle>
            <DialogDescription>
              Upload and manage images for this product.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <ProductImageUpload
              images={productImages[selectedProduct.id] || []}
              onImagesChange={(images) => handleImageUploadSubmit(images)}
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
