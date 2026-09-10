import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/AdminLayout";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/public/Home";
import MenuDetails from "./pages/public/MenuDetails";
import Register from "./pages/public/Register";
import UserLogin from "./pages/public/UserLogin";
import AdminLogin from "./pages/public/AdminLogin";

import Dashboard from "./pages/admin/Dashboard";
import MenuItems from "./pages/admin/MenuItems";
import AddMenuItem from "./pages/admin/AddMenuItem";
import EditMenuItem from "./pages/admin/EditMenuItem";
import Users from "./pages/admin/Users";

const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/menu/:id" element={<PublicLayout><MenuDetails /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><UserLogin /></PublicLayout>} />
      <Route path="/admin/login" element={<PublicLayout><AdminLogin /></PublicLayout>} />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="menu-items" element={<MenuItems />} />
        <Route path="menu-items/add" element={<AddMenuItem />} />
        <Route path="menu-items/edit/:id" element={<EditMenuItem />} />
        <Route path="users" element={<Users />} />
      </Route>

      <Route path="*" element={<PublicLayout><Home /></PublicLayout>} />
    </Routes>
  );
}

export default App;
