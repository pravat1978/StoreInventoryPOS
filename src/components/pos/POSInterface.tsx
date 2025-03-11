import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Tag, ArrowLeft, ShoppingBag } from "lucide-react";
import ProductSearch from "./ProductSearch";
import ShoppingCart from "./ShoppingCart";
import CheckoutPanel from "./CheckoutPanel";
import ReceiptGenerator from "./ReceiptGenerator";

interface POSInterfaceProps {
  userName?: string;
  onBackToDashboard?: () => void;
}

const POSInterface = ({
  userName = "Cashier",
  onBackToDashboard = () => console.log("Back to dashboard"),
}: POSInterfaceProps) => {
  const [activeTab, setActiveTab] = useState("products");
  const [showReceipt, setShowReceipt] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Mock product data
  const products = [
    {
      id: "p1",
      name: "Cotton T-Shirt",
      price: 19.99,
      category: "apparel",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
      attributes: { size: "M", color: "Blue" },
    },
    {
      id: "p2",
      name: "Denim Jeans",
      price: 39.99,
      category: "apparel",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",
      attributes: { size: "32", color: "Dark Blue" },
    },
    {
      id: "p3",
      name: "Acrylic Paint Set",
      price: 24.99,
      category: "craft",
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&q=80",
      attributes: { type: "Paint", brand: "ArtistChoice" },
    },
    {
      id: "p4",
      name: "Canvas (16x20)",
      price: 8.5,
      category: "craft",
      image:
        "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=300&q=80",
      attributes: { type: "Canvas", brand: "ArtSupply" },
    },
  ];

  // Handle search
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchResults(results);
  };

  // Handle barcode scan
  const handleScan = () => {
    console.log("Scanning barcode...");
    // In a real implementation, this would activate a barcode scanner
    // and process the scanned code
  };

  // Handle adding product to cart
  const handleAddToCart = (product: any) => {
    console.log("Adding to cart:", product);
    // In a real implementation, this would add the product to the cart
  };

  // Handle checkout completion
  const handleCompleteTransaction = () => {
    setShowReceipt(true);
    setActiveTab("receipt");
  };

  // Handle starting a new transaction
  const handleNewTransaction = () => {
    setShowReceipt(false);
    setActiveTab("products");
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBackToDashboard}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Point of Sale</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Cashier: {userName}</span>
          <Tag className="h-4 w-4 text-gray-600" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="products" disabled={showReceipt}>
                Products
              </TabsTrigger>
              <TabsTrigger value="receipt" disabled={!showReceipt}>
                Receipt
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString()} |{" "}
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>

          <TabsContent value="products" className="h-[calc(100%-48px)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
              {/* Left Column - Product Search and Results */}
              <div className="lg:col-span-2 space-y-4">
                <ProductSearch onSearch={handleSearch} onScan={handleScan} />

                <Card className="h-[calc(100%-76px)] overflow-auto">
                  <CardContent className="p-4">
                    {searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleAddToCart(product)}
                          >
                            <div className="h-40 overflow-hidden bg-gray-100">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3">
                              <h3 className="font-medium">{product.name}</h3>
                              <div className="flex justify-between items-center mt-2">
                                <span className="font-bold">
                                  ₹{product.price.toFixed(2)}
                                </span>
                                <Button size="sm" variant="ghost">
                                  <ShoppingBag className="h-4 w-4 mr-1" /> Add
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-gray-500">
                        <ShoppingBag className="h-12 w-12 mb-2 opacity-20" />
                        <p>Search for products to add to cart</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Shopping Cart and Checkout */}
              <div className="space-y-4">
                <div className="h-[calc(100%-320px)]">
                  <ShoppingCart />
                </div>
                <div className="h-[300px]">
                  <CheckoutPanel
                    onCompleteTransaction={handleCompleteTransaction}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="receipt" className="h-[calc(100%-48px)]">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-full max-w-md">
                <ReceiptGenerator />
                <div className="mt-4 text-center">
                  <Button onClick={handleNewTransaction}>
                    Start New Transaction
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default POSInterface;
