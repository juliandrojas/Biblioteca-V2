export default function BooksSection({ books }) {
  return (
    <div className="container mt-5" id="books">
      <h2 className="fw-bold text-center mb-4">Últimos libros</h2>

      <div className="row g-4">
        {books.map((book) => (
          <div className="col-md-4" key={book.id}>
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <img
                src={book.imageUrl}
                className="card-img-top"
                alt={book.title}
                style={{
                  height: "280px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body text-center">
                <h5 className="fw-bold">{book.title}</h5>

                <p className="text-muted mb-1">{book.author}</p>

                <span className="badge bg-primary">{book.category?.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
