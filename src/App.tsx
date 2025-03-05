import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Login from "@/pages/Login";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "@/components/protect_router/ProtectedRoute";
import { AppProvider } from "@/contexts/AppProvider";
import ProductsPage from "./pages/Products/Products";
import CreateProductPage from "@/pages/Products/AddProduct";
import UpdateProductPage from "@/pages/Products/UpdateProductPage";
// import UsersList from "@/pages/Users/UsersList";
// import AddUser from "@/pages/Users/AddUser";
// import UpdateUser from "@/pages/Users/UpdateUser";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/*" element={<ProtectedLayout />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col w-full">
          <Topbar />
          <div className="mb-4">
          <Breadcrumbs />
          <main className="flex-1 bg-gray-100 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              {/* Routes for Products */}
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/add" element={<CreateProductPage />} />
              <Route path="/products/update/:id" element={<UpdateProductPage />} />

              {/* Routes for Users */}
              {/* <Route path="/users" element={<UsersList />} />
              <Route path="/users/add" element={<AddUser />} />
              <Route path="/users/update" element={<UpdateUser />} /> */}
            </Routes>
          </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
