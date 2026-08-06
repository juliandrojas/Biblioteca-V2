export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-1 fw-bold">Sistema Biblioteca</p>

        <small>
          © {new Date().getFullYear()} Todos los derechos reservados.
        </small>
      </div>
    </footer>
  );
}
