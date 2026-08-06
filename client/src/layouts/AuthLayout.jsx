import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

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
