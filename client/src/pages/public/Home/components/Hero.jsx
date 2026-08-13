import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <section className="bg-primary text-white py-5 text-center" id="hero">
        <div className="container text-center">
          <h1 className="display-3 fw-bold">Biblioteca UTS</h1>
          <p className="lead mt-3">
            Encuentra libros, administra préstamos y descubre nuevas lecturas.
          </p>
          <div className="mt-4">
            <a href="/libros" className="btn btn-light btn-lg me-3">
              Ver catálogo
            </a>
            <Link to="/login" className="btn btn-outline-light btn-lg">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>
      <br />
    </>
  );
}
