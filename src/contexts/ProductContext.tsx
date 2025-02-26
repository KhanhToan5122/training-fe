import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductList } from "@/api/products";
import { useProductTable } from "./ProductTableContext";

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  images: string[] | null;
  created_at: string;
}

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  last_page: number;
  pageSize: number;
  setPageSize: (size: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const { page, search } = useProductTable();
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ["products", page, pageSize],
    queryFn: () => getProductList(page, pageSize),
  });

  return (
    <ProductContext.Provider
      value={{
        products: data?.data || [],
        isLoading,
        last_page: data?.last_page || 1,
        pageSize,
        setPageSize,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
