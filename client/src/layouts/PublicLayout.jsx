import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

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
        <main className="flex-grow-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
