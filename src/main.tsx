import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Đổi từ Layout thành App
import "./index.css";
import { SidebarProvider } from "@/components/layout/SidebarProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
