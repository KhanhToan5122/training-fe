import * as React from "react";

type SidebarContextType = {
  open: boolean;
  toggleSidebar: () => void;
  // isMobile: boolean;
};

const SidebarContext = React.createContext<SidebarContextType | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}

export function SidebarProvider({ defaultOpen = true, children }: { defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(defaultOpen);
  // const [isMobile, setIsMobile] = React.useState(false);
  // React.useEffect(() => {
  //   const checkMobile = () => setIsMobile(window.innerWidth < 768);
  //   checkMobile(); 
  //   window.addEventListener("resize", checkMobile);
  //   return () => window.removeEventListener("resize", checkMobile);
  // }, []);

  return (
    <SidebarContext.Provider value={{ open, toggleSidebar: () => setOpen((prev) => !prev) }}>
      {children}
    </SidebarContext.Provider>
  );
}
