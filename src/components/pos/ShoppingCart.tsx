import React, { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: "apparel" | "craft";
  attributes: {
    size?: string;
    color?: string;
    type?: string;
    brand?: string;
  };
}

interface ShoppingCartProps {
  items?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onClearCart?: () => void;
}

const ShoppingCart = ({
  items = [
    {
      id: "1",
      name: "Cotton T-Shirt",
      price: 19.99,
      quantity: 2,
      category: "apparel",
      attributes: {
        size: "M",
        color: "Blue",
      },
    },
    {
      id: "2",
      name: "Acrylic Paint Set",
      price: 24.99,
      quantity: 1,
      category: "craft",
      attributes: {
        type: "Paint",
        brand: "ArtistChoice",
      },
    },
    {
      id: "3",
      name: "Denim Jeans",
      price: 39.99,
      quantity: 1,
      category: "apparel",
      attributes: {
        size: "32",
        color: "Dark Blue",
      },
    },
  ],
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onClearCart = () => {},
}: ShoppingCartProps) => {
  // Local state to manage cart items if not provided via props
  const [cartItems, setCartItems] = useState<CartItem[]>(items);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Calculate tax (assuming 8%)
  const tax = subtotal * 0.08;

  // Calculate total
  const total = subtotal + tax;

  // Handle quantity change
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item,
    );

    setCartItems(updatedItems);
    onUpdateQuantity(id, newQuantity);
  };

  // Handle item removal
  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    onRemoveItem(id);
  };

  // Handle clearing the cart
  const handleClearCart = () => {
    setCartItems([]);
    onClearCart();
  };

  return (
    <Card className="w-full h-full bg-white shadow-lg">
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-bold">Shopping Cart</CardTitle>
      </CardHeader>

      <CardContent className="p-0 overflow-auto" style={{ maxHeight: "400px" }}>
        {cartItems.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex gap-2 mt-1">
                      {item.category === "apparel" && (
                        <Badge variant="secondary" className="text-xs">
                          {item.attributes.size} / {item.attributes.color}
                        </Badge>
                      )}
                      {item.category === "craft" && (
                        <Badge variant="secondary" className="text-xs">
                          {item.attributes.brand} / {item.attributes.type}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-semibold">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value) || 1,
                          )
                        }
                        className="h-8 w-12 rounded-none text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter className="flex-col border-t p-4">
        <div className="w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (8%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between w-full mt-4">
          <Button
            variant="outline"
            className="w-1/3"
            onClick={handleClearCart}
            disabled={cartItems.length === 0}
          >
            Clear
          </Button>
          <Button className="w-2/3 ml-2" disabled={cartItems.length === 0}>
            Proceed to Checkout
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ShoppingCart;
