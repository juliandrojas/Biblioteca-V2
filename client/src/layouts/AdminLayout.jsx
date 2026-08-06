import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AdminLayout() {
  const navigate = useNavigate();

  const navLinks = [
    { text: "Dashboard", to: "/admin" },
    { text: "Libros", to: "/admin/books" },
    { text: "Categorías", to: "/admin/categories" },
    { text: "Usuarios", to: "/admin/users" },
    { text: "Préstamos", to: "/admin/loans" },
  ];

  const handleLogout = () => {
    logout();
    alert("Sesión cerrada");
    navigate("/login");
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar
          brandName="Administrador"
          links={navLinks}
          onLogout={handleLogout}
        />

        <main className="container flex-grow-1 py-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
