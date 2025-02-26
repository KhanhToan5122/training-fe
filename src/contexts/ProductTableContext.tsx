import { createContext, useContext, useState } from "react";

interface ProductTableContextType {
  page: number;
  setPage: (page: number) => void;
  search: string;
  setSearch: (search: string) => void;
}

const ProductTableContext = createContext<ProductTableContextType | undefined>(undefined);

export const ProductTableProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <ProductTableContext.Provider value={{ page, setPage, search, setSearch }}>
      {children}
    </ProductTableContext.Provider>
  );
};

export const useProductTable = () => {
  const context = useContext(ProductTableContext);
  if (!context) {
    throw new Error("useProductTable must be used within a ProductTableProvider");
  }
  return context;
};
