import { ProductProvider } from "./ProductContext";
import { ProductTableProvider } from "./ProductTableContext";
// import { UserProvider } from "./UserContext";
// import { UserFormProvider } from "./UserFormContext";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ProductTableProvider>
      <ProductProvider>
      
        {/* <UserProvider>
          <UserFormProvider> */}
            {children}
          {/* </UserFormProvider>
        </UserProvider> */}
      
      </ProductProvider>
    </ProductTableProvider>
  );
}
