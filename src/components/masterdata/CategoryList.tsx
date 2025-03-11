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
import { Edit, Trash2, FolderTree, Tag, ChevronRight } from "lucide-react";
import { Category } from "./CategoryForm";

interface CategoryListProps {
  onEdit: (category: Category) => void;
}

const CategoryList = ({ onEdit }: CategoryListProps) => {
  // Mock data for categories
  const categories: Category[] = [
    {
      id: "1",
      name: "Apparel",
      code: "CAT-APP",
      description: "All clothing and wearable items",
      isActive: true,
    },
    {
      id: "2",
      name: "T-Shirts",
      code: "CAT-APP-TS",
      description: "All types of t-shirts",
      parentId: "1",
      isActive: true,
    },
    {
      id: "3",
      name: "Jeans",
      code: "CAT-APP-JN",
      description: "Denim pants and jeans",
      parentId: "1",
      isActive: true,
    },
    {
      id: "4",
      name: "Art & Craft",
      code: "CAT-ART",
      description: "Art supplies and craft materials",
      isActive: true,
    },
    {
      id: "5",
      name: "Paints",
      code: "CAT-ART-PT",
      description: "All types of paints and painting supplies",
      parentId: "4",
      isActive: true,
    },
    {
      id: "6",
      name: "Canvas",
      code: "CAT-ART-CV",
      description: "Canvas for painting",
      parentId: "4",
      isActive: true,
    },
    {
      id: "7",
      name: "Seasonal",
      code: "CAT-SEA",
      description: "Seasonal items and collections",
      isActive: false,
    },
  ];

  // Function to get parent category name
  const getParentName = (parentId?: string) => {
    if (!parentId) return "None";
    const parent = categories.find((c) => c.id === parentId);
    return parent ? parent.name : "Unknown";
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Parent Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {category.parentId ? (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <FolderTree className="h-4 w-4 text-primary" />
                    )}
                    {category.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {category.code}
                  </div>
                </TableCell>
                <TableCell>{getParentName(category.parentId)}</TableCell>
                <TableCell className="max-w-[300px] truncate">
                  {category.description}
                </TableCell>
                <TableCell>
                  {category.isActive ? (
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
                      onClick={() => onEdit(category)}
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

export default CategoryList;
