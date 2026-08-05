import { Link } from "react-router-dom";

export default function Navbar({
  brandName = "Biblioteca",
  links = [],
  onLogout,
}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top border-bottom border-secondary py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold text-white fs-4 mb-0" to="/">
          {brandName}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 mt-3 mt-lg-0">
            {links.map((link) => (
              <Link
                key={link.text}
                to={link.to}
                className="nav-link text-light text-decoration-none"
              >
                {link.text}
              </Link>
            ))}

            {onLogout && (
              <button className="btn btn-outline-danger" onClick={onLogout}>
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
