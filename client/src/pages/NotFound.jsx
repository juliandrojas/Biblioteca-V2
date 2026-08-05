import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "75vh" }}
    >
      <div className="display-1 mb-3">📚</div>

      <h1 className="display-1 fw-bold text-primary">404</h1>

      <h2 className="fw-semibold mt-3">Página no encontrada</h2>

      <p className="text-muted mt-3 mb-4" style={{ maxWidth: "500px" }}>
        Lo sentimos, la página que intentas visitar no existe o fue eliminada.
      </p>

      <Link to="/" className="btn btn-primary btn-lg">
        🏠 Volver al inicio
      </Link>
    </div>
  );
}
