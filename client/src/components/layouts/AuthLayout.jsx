import { Outlet } from "react-router-dom";
import Navbar from "../../../../../Biblioteca/client/src/components/Navbar";
import Footer from "../common/Footer";

export default function AuthLayout() {
  const navLinks = [{ text: "Volver a Inicio", to: "/" }];
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar brandName="Auth Layout" links={navLinks} />
        <main className="container flex-grow-1 py-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
