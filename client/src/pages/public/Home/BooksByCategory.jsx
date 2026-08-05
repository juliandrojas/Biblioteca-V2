import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBooksByCategory } from "../../../services/bookService";

export default function BooksByCategory() {
  const { id } = useParams();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooksByCategory(id);
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, [id]);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Libros</h2>

      <div className="row">
        {books.map((book) => (
          <div className="col-md-3 mb-4" key={book.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={book.imageUrl}
                className="card-img-top"
                alt={book.title}
                style={{
                  height: "280px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">
                <h5>{book.title}</h5>

                <p className="text-muted">{book.author}</p>

                <span className="badge bg-primary">{book.category.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
