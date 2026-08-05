import { Link } from "react-router-dom";
export default function CategoriesSection({ categories }) {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Encabezado */}
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5">Explora nuestras categorías</h2>

          <p className="text-muted">Encuentra libros según tus intereses.</p>
        </div>

        {/* Categorías */}
        <div className="row g-4">
          {categories.map((category) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={category.id}>
              <div className="card category-public-card border-0 shadow-sm h-100 rounded-4">
                <div className="card-body text-center">
                  <div
                    className="bg-primary bg-opacity-10 rounded-circle d-inline-flex
                    align-items-center justify-content-center mb-3"
                    style={{
                      width: 70,
                      height: 70,
                    }}
                  >
                    <i className="bi bi-book-half fs-2 text-primary"></i>
                  </div>

                  <h4 className="fw-bold">{category.name}</h4>

                  <p className="text-muted small mb-4">
                    Descubre libros de esta categoría.
                  </p>

                  <Link
                    to={`/categories/${category.id}`}
                    className="btn btn-outline-primary rounded-pill px-4"
                  >
                    Ver libros
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
