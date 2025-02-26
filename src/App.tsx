import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "@/components/protect_router/ProtectedRoute";
import ProductsList from "@/pages/Products/ProductsList";
import { AppProvider } from "@/contexts/AppProvider";
// import AddProduct from "@/pages/Products/AddProduct";
// import UpdateProduct from "@/pages/Products/UpdateProduct";
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
          <main className="flex-1 bg-gray-100 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              {/* Routes for Products */}
              <Route path="/products" element={<ProductsList />} />
              {/* <Route path="/products/add" element={<AddProduct />} />
              <Route path="/products/update" element={<UpdateProduct />} /> */}

              {/* Routes for Users */}
              {/* <Route path="/users" element={<UsersList />} />
              <Route path="/users/add" element={<AddUser />} />
              <Route path="/users/update" element={<UpdateUser />} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
