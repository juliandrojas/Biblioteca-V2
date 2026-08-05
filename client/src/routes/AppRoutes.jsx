import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "../components/layouts/AdminLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import PublicLayout from "../components/layouts/PublicLayout";
import Books from "../pages/admin/Books";
import Categories from "../pages/admin/Categories";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import NotFound from "../pages/NotFound";
import BooksByCategory from "../pages/public/Home/BooksByCategory";
import Home from "../pages/public/Home/Home";
import FormLogin from "../pages/public/Login/FormLogin";
import FormRecovery from "../pages/public/Recovery/FormRecovery";
import FormRegister from "../pages/public/Register/FormRegister";
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:id" element={<BooksByCategory />} />
        </Route>

        {/* Solo invitados */}
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<FormLogin />} />
            <Route path="/register" element={<FormRegister />} />
            <Route path="/recovery" element={<FormRecovery />} />
          </Route>
        </Route>

        {/* Solo usuarios autenticados */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="users" element={<Users />} />
            <Route path="books" element={<Books />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
