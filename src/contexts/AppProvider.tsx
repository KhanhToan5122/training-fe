import { DataTableProvider } from "@/contexts/DataTableContext";
import { getProductList } from "@/api/products";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <DataTableProvider 
      queryOptions={(filter) => ({
        queryKey: ["products", filter], 
        queryFn: () => getProductList(filter), 
      })}
    >
      {children}
    </DataTableProvider>
  );
}
