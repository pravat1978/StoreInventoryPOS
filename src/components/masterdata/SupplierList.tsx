import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Building, Phone, Mail, FileText } from "lucide-react";
import { Supplier } from "./SupplierForm";

interface SupplierListProps {
  onEdit: (supplier: Supplier) => void;
}

const SupplierList = ({ onEdit }: SupplierListProps) => {
  // Mock data for suppliers
  const suppliers: Supplier[] = [
    {
      id: "1",
      name: "Fashion Wholesale Inc.",
      address: "100 Fashion Ave, New York, NY 10001",
      contactPerson: "John Smith",
      email: "john@fashionwholesale.com",
      phone: "(555) 123-4567",
      gstNumber: "29AADCB2230M1ZP",
      isActive: true,
    },
    {
      id: "2",
      name: "Creative Supplies Co.",
      address: "200 Art Street, Portland, OR 97201",
      contactPerson: "Sarah Johnson",
      email: "sarah@creativesupplies.com",
      phone: "(555) 987-6543",
      gstNumber: "27AADCB2230M1ZQ",
      isActive: true,
    },
    {
      id: "3",
      name: "Winter Clothing Ltd.",
      address: "300 Cold Lane, Minneapolis, MN 55401",
      contactPerson: "Michael Brown",
      email: "michael@winterclothing.com",
      phone: "(555) 456-7890",
      gstNumber: "24AADCB2230M1ZR",
      isActive: false,
    },
  ];

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>GST Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    {supplier.name}
                  </div>
                </TableCell>
                <TableCell>{supplier.contactPerson}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {supplier.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {supplier.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {supplier.gstNumber}
                  </div>
                </TableCell>
                <TableCell>
                  {supplier.isActive ? (
                    <Badge variant="default">Active</Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(supplier)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SupplierList;
