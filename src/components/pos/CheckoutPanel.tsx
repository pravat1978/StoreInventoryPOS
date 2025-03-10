import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  CreditCard,
  DollarSign,
  Wallet,
  Receipt,
  ArrowRight,
  X,
} from "lucide-react";

interface CheckoutPanelProps {
  subtotal?: number;
  tax?: number;
  total?: number;
  discountAmount?: number;
  onApplyDiscount?: (code: string) => void;
  onSelectPaymentMethod?: (method: string) => void;
  onCompleteTransaction?: () => void;
  onCancelTransaction?: () => void;
}

const CheckoutPanel = ({
  subtotal = 125.99,
  tax = 10.5,
  total = 136.49,
  discountAmount = 0,
  onApplyDiscount = () => {},
  onSelectPaymentMethod = () => {},
  onCompleteTransaction = () => {},
  onCancelTransaction = () => {},
}: CheckoutPanelProps) => {
  const [discountCode, setDiscountCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cashAmount, setCashAmount] = useState("");

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      onApplyDiscount(discountCode);
    }
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    onSelectPaymentMethod(value);
  };

  const handleCheckout = () => {
    setShowPaymentDialog(true);
  };

  const handleCompletePayment = () => {
    setShowPaymentDialog(false);
    onCompleteTransaction();
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="card-number"
                className="block text-sm font-medium mb-1"
              >
                Card Number
              </label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiry"
                  className="block text-sm font-medium mb-1"
                >
                  Expiry Date
                </label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                  CVV
                </label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case "cash":
        return (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="cash-amount"
                className="block text-sm font-medium mb-1"
              >
                Cash Amount
              </label>
              <Input
                id="cash-amount"
                placeholder="Enter amount"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
              />
            </div>
            {parseFloat(cashAmount) > total && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm font-medium">
                  Change Due: ${(parseFloat(cashAmount) - total).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        );
      case "digital":
        return (
          <div className="space-y-4">
            <div className="p-4 border rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm mb-2">
                  Scan QR code with your mobile payment app
                </p>
                <div className="w-48 h-48 bg-gray-200 mx-auto flex items-center justify-center">
                  <p className="text-xs text-gray-500">[QR Code Placeholder]</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Order Summary</h3>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Discount Code */}
        <div className="pt-2">
          <h3 className="text-sm font-medium mb-2">Discount Code</h3>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleApplyDiscount} variant="outline" size="sm">
              Apply
            </Button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="pt-2">
          <h3 className="text-sm font-medium mb-2">Payment Method</h3>
          <RadioGroup
            value={paymentMethod}
            onValueChange={handlePaymentMethodChange}
            className="grid grid-cols-3 gap-2"
          >
            <div className="flex flex-col items-center space-y-2 border rounded-md p-3 cursor-pointer hover:bg-muted transition-colors">
              <CreditCard className="h-5 w-5" />
              <label className="text-xs font-medium cursor-pointer">Card</label>
              <RadioGroupItem value="card" className="sr-only" />
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-md p-3 cursor-pointer hover:bg-muted transition-colors">
              <DollarSign className="h-5 w-5" />
              <label className="text-xs font-medium cursor-pointer">Cash</label>
              <RadioGroupItem value="cash" className="sr-only" />
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-md p-3 cursor-pointer hover:bg-muted transition-colors">
              <Wallet className="h-5 w-5" />
              <label className="text-xs font-medium cursor-pointer">
                Digital
              </label>
              <RadioGroupItem value="digital" className="sr-only" />
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancelTransaction}>
          <X className="mr-2 h-4 w-4" /> Cancel
        </Button>
        <Button onClick={handleCheckout}>
          Checkout <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
          </DialogHeader>
          <div className="py-4">{renderPaymentForm()}</div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPaymentDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCompletePayment}>
              <Receipt className="mr-2 h-4 w-4" /> Complete Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CheckoutPanel;
