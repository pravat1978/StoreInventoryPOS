import React, { useState } from "react";
import { Printer, Mail, Download, Copy, Check } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface ReceiptData {
  receiptNumber: string;
  date: string;
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  customerEmail?: string;
}

interface ReceiptGeneratorProps {
  receiptData?: ReceiptData;
  onPrint?: () => void;
  onEmail?: (email: string) => void;
  onDownload?: () => void;
  open?: boolean;
}

const defaultReceiptData: ReceiptData = {
  receiptNumber: "RCT-2023-0001",
  date: new Date().toLocaleDateString(),
  items: [
    { id: "1", name: "Cotton T-Shirt (L, Blue)", quantity: 2, price: 19.99 },
    { id: "2", name: "Acrylic Paint Set", quantity: 1, price: 24.95 },
    { id: "3", name: "Canvas (16x20)", quantity: 3, price: 8.5 },
  ],
  subtotal: 90.43,
  tax: 7.23,
  total: 97.66,
  paymentMethod: "Credit Card",
};

const ReceiptGenerator: React.FC<ReceiptGeneratorProps> = ({
  receiptData = defaultReceiptData,
  onPrint = () => console.log("Print receipt"),
  onEmail = (email) => console.log(`Email receipt to ${email}`),
  onDownload = () => console.log("Download receipt"),
  open = true,
}) => {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [includeItemDetails, setIncludeItemDetails] = useState(true);
  const [receiptFormat, setReceiptFormat] = useState("standard");
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    onPrint();
  };

  const handleEmailSubmit = () => {
    onEmail(email);
    setShowEmailDialog(false);
  };

  const handleDownload = () => {
    onDownload();
  };

  const handleCopyReceipt = () => {
    // In a real implementation, this would copy receipt details to clipboard
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-4 w-full max-w-md mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">
            Receipt #{receiptData.receiptNumber}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date:</span>
            <span>{receiptData.date}</span>
          </div>

          <div className="border-t border-b py-2">
            <div className="font-medium mb-2">Items</div>
            {receiptData.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <div>
                  <span>{item.name}</span>
                  <span className="text-muted-foreground ml-2">
                    x{item.quantity}
                  </span>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${receiptData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax:</span>
              <span>${receiptData.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total:</span>
              <span>${receiptData.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Payment Method:</span>
            <span>{receiptData.paymentMethod}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="flex justify-between w-full">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEmailDialog(true)}
            >
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
          </div>
          <div className="flex justify-between w-full">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyReceipt}>
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email Receipt</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="customer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="format" className="text-sm font-medium">
                Receipt Format
              </label>
              <Select value={receiptFormat} onValueChange={setReceiptFormat}>
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="simplified">Simplified</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="include-items" className="text-sm font-medium">
                Include Item Details
              </label>
              <Switch
                id="include-items"
                checked={includeItemDetails}
                onCheckedChange={setIncludeItemDetails}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEmailSubmit}>Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReceiptGenerator;
