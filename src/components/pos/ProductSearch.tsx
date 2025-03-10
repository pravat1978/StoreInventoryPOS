import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Barcode, X } from "lucide-react";

interface ProductSearchProps {
  onSearch?: (query: string) => void;
  onScan?: () => void;
  placeholder?: string;
  className?: string;
}

const ProductSearch = ({
  onSearch = () => {},
  onScan = () => {},
  placeholder = "Search by product name, SKU or scan barcode...",
  className = "",
}: ProductSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className={`w-full max-w-md bg-white ${className}`}>
      <form onSubmit={handleSearch} className="relative flex items-center">
        <div className="relative flex-grow">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="pr-10 pl-10 h-[60px] text-base rounded-l-md border-r-0"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <Button
          type="button"
          onClick={onScan}
          className="h-[60px] rounded-l-none rounded-r-md px-4 flex items-center justify-center"
          aria-label="Scan barcode"
        >
          <Barcode className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">Scan</span>
        </Button>
      </form>

      {/* This would be where search results appear */}
      <div className="mt-2 hidden">
        {/* Search results would be rendered here */}
        <div className="p-2 text-sm text-gray-500">
          No search results to display
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
