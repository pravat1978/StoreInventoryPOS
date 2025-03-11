import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Upload, Image as ImageIcon } from "lucide-react";

export interface ProductImage {
  id: string;
  url: string;
  isPrimary: boolean;
  altText?: string;
}

interface ProductImageUploadProps {
  images: ProductImage[];
  onImagesChange: (images: ProductImage[]) => void;
  maxImages?: number;
}

const ProductImageUpload = ({
  images = [],
  onImagesChange,
  maxImages = 5,
}: ProductImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      setError(`You can only upload a maximum of ${maxImages} images`);
      return;
    }

    setIsUploading(true);
    setError(null);

    // In a real app, you would upload the files to a server
    // Here we'll simulate it with a timeout and use local URLs
    setTimeout(() => {
      const newImages: ProductImage[] = [];

      Array.from(files).forEach((file) => {
        // Create a local URL for the file
        const url = URL.createObjectURL(file);
        newImages.push({
          id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          url,
          isPrimary: images.length === 0 && newImages.length === 0,
          altText: file.name,
        });
      });

      onImagesChange([...images, ...newImages]);
      setIsUploading(false);
      e.target.value = ""; // Reset the input
    }, 1000);
  };

  const handleRemoveImage = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id);

    // If we removed the primary image, set the first remaining image as primary
    if (
      updatedImages.length > 0 &&
      !updatedImages.some((img) => img.isPrimary)
    ) {
      updatedImages[0].isPrimary = true;
    }

    onImagesChange(updatedImages);
  };

  const handleSetPrimary = (id: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isPrimary: img.id === id,
    }));
    onImagesChange(updatedImages);
  };

  const handleUpdateAltText = (id: string, altText: string) => {
    const updatedImages = images.map((img) =>
      img.id === id ? { ...img, altText } : img,
    );
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="product-images">Product Images</Label>
        <span className="text-sm text-muted-foreground">
          {images.length} / {maxImages} images
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className={`relative border rounded-md overflow-hidden group ${image.isPrimary ? "ring-2 ring-primary" : ""}`}
          >
            <div className="aspect-square w-full bg-gray-100 flex items-center justify-center">
              <img
                src={image.url}
                alt={image.altText || "Product image"}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-2 space-y-2">
              <Input
                type="text"
                placeholder="Alt text"
                value={image.altText || ""}
                onChange={(e) => handleUpdateAltText(image.id, e.target.value)}
                className="text-xs h-7"
              />
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant={image.isPrimary ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7 w-full"
                  onClick={() => handleSetPrimary(image.id)}
                  disabled={image.isPrimary}
                >
                  {image.isPrimary ? "Primary" : "Set Primary"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs h-7 text-red-500 hover:text-red-700 hover:bg-red-50 ml-1"
                  onClick={() => handleRemoveImage(image.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {images.length < maxImages && (
          <div className="border border-dashed rounded-md flex flex-col items-center justify-center p-4 aspect-square">
            <Label
              htmlFor="product-images"
              className="cursor-pointer flex flex-col items-center justify-center h-full w-full"
            >
              <div className="flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm font-medium">Upload Images</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Click to browse
                </span>
              </div>
              <Input
                id="product-images"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </Label>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

      {isUploading && (
        <div className="flex items-center justify-center p-4 bg-muted rounded-md">
          <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin mr-2" />
          <span>Uploading images...</span>
        </div>
      )}

      {images.length === 0 && !isUploading && (
        <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-md">
          <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No product images uploaded</p>
          <Label htmlFor="product-images-empty" className="cursor-pointer mt-4">
            <Button type="button" size="sm">
              <Upload className="h-4 w-4 mr-2" /> Upload Images
            </Button>
            <Input
              id="product-images-empty"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </Label>
        </div>
      )}
    </div>
  );
};

export default ProductImageUpload;
