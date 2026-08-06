import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <>
      <section className="container text-center py-5">
        <h2 className="fw-bold">¿Listo para comenzar?</h2>

        <p>
          Inicia sesión para acceder a todas las funciones de la biblioteca.
        </p>

        <Link to="/login" className="btn btn-warning btn-lg">
          Iniciar sesión
        </Link>
      </section>
    </>
  );
}
