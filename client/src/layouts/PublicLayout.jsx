import { Outlet } from "react-router-dom";
import Navbar from "../../../../../Biblioteca/client/src/components/Navbar";
import Footer from "../common/Footer";

export default function PublicLayout() {
  const navLinks = [
    { text: "Inicio", to: "/" },
    { text: "Libros", to: "/#books" },
    { text: "Préstamos", to: "/#prestamos" },
    { text: "Ingresar", to: "/login" },
  ];
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar brandName="Public Layout" links={navLinks} />
        <main className="container flex-grow-1 py-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
