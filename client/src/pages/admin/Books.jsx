import { useEffect, useState } from "react";
import { createBook, getBooks } from "../../services/bookService";
import { getCategories } from "../../services/categoryService";
export default function Books() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedAt: "",
    copies: 1,
    available: 1,
    imageUrl: "",
    categoryId: "",
  });

  // ==========================
  // Obtener libros
  // ==========================
  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================
  // Obtener categorías
  // ==========================
  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  // ==========================
  // Actualizar formulario
  // ==========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================
  // Crear libro
  // ==========================
  const handleCreateBook = async () => {
    try {
      await createBook(formData);

      await fetchBooks();

      handleCloseModal();

      alert("Libro creado correctamente");
    } catch (error) {
      alert(error.response?.data?.error || "Ocurrió un error");
    }
  };

  // ==========================
  // Cerrar modal
  // ==========================
  const handleCloseModal = () => {
    setShowModal(false);

    setFormData({
      title: "",
      author: "",
      isbn: "",
      publishedAt: "",
      copies: 1,
      available: 1,
      imageUrl: "",
      categoryId: "",
    });
  };

  return (
    <div className="container py-4" id="books">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h1 className="fw-bold">Libros</h1>

          <p className="text-muted">
            Administra los libros disponibles en la biblioteca.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <i className="bi bi-book-fill me-2"></i>
          Nuevo libro
        </button>
      </div>

      {/* Estadísticas */}
      <div className="alert alert-light border shadow-sm rounded-3 mb-4">
        <i className="bi bi-book-fill me-2 text-primary"></i>
        Total de libros:
        <strong> {books.length}</strong>
      </div>

      {/* Tabla */}
      {books.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-journal-x display-1 text-secondary"></i>

          <h3>No hay libros registrados</h3>

          <p className="text-muted">Agrega el primer libro para comenzar.</p>
        </div>
      ) : (
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>ISBN</th>
                    <th>Categoría</th>
                    <th>Disponibles</th>
                  </tr>
                </thead>

                <tbody>
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>

                      <td>{book.author}</td>

                      <td>{book.isbn}</td>

                      <td>{book.category?.name}</td>

                      <td>
                        {book.available} / {book.copies}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {/* <Modal
        show={showModal}
        onClose={handleCloseModal}
        title="Registrar libro"
        size="modal-lg"
        footer={
          <>
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              Cancelar
            </button>

            <button className="btn btn-success" onClick={handleCreateBook}>
              Guardar
            </button>
          </>
        }
      >
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Título</label>

            <input
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Autor</label>

            <input
              className="form-control"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">ISBN</label>

            <input
              className="form-control"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Año</label>

            <input
              type="number"
              className="form-control"
              name="publishedAt"
              value={formData.publishedAt}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Copias</label>

            <input
              type="number"
              className="form-control"
              name="copies"
              value={formData.copies}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Disponibles</label>

            <input
              type="number"
              className="form-control"
              name="available"
              value={formData.available}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Imagen</label>

            <input
              className="form-control"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="col-12">
            <label className="form-label">Categoría</label>

            <select
              className="form-select"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
            >
              <option value="">Seleccione una categoría</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal> */}
    </div>
  );
}
