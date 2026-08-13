import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { createBook, getBooks } from "../../services/bookService";
import { getCategories } from "../../services/categoryService";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  // ==========================
  // Cargar datos
  // ==========================
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
      if (!formData.title.trim() || !formData.author.trim()) {
        alert("El título y el autor son obligatorios.");
        return;
      }

      if (!formData.categoryId) {
        alert("Debes seleccionar una categoría.");
        return;
      }

      const copies = Number(formData.copies || 1);
      const available = Number(formData.available ?? copies);

      if (copies < 1) {
        alert("Debe existir al menos una copia.");
        return;
      }

      if (available < 0) {
        alert("La cantidad disponible no puede ser negativa.");
        return;
      }

      if (available > copies) {
        alert("La cantidad disponible no puede ser mayor que las copias.");
        return;
      }

      await createBook({
        ...formData,
        title: formData.title.trim(),
        author: formData.author.trim(),
        isbn: formData.isbn.trim(),
        publishedAt:
          formData.publishedAt === "" ? null : Number(formData.publishedAt),
        copies,
        available,
        categoryId: Number(formData.categoryId),
        imageUrl: formData.imageUrl.trim(),
      });

      await fetchBooks();

      handleCloseModal();

      alert("Libro creado correctamente");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Ocurrió un error",
      );
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

  // ==========================
  // Filtrar libros
  // ==========================
  const filteredBooks =
    searchTerm.trim() === ""
      ? books
      : books.filter((book) => {
          const search = searchTerm.toLowerCase().trim();

          return (
            book.title?.toLowerCase().includes(search) ||
            book.author?.toLowerCase().includes(search) ||
            book.isbn?.toLowerCase().includes(search) ||
            book.category?.name?.toLowerCase().includes(search)
          );
        });

  return (
    <div className="container py-4" id="books">
      {/* ==========================
          Encabezado
      ========================== */}
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

      {/* ==========================
          Modal crear libro
      ========================== */}
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        title="Registrar libro"
        size="modal-lg"
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="btn btn-success"
              onClick={handleCreateBook}
            >
              <i className="bi bi-check-lg me-2"></i>
              Guardar libro
            </button>
          </>
        }
      >
        <div className="row g-3">
          {/* Título */}
          <div className="col-12">
            <label className="form-label">Título</label>

            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej. Cien años de soledad"
            />
          </div>

          {/* Autor */}
          <div className="col-md-6">
            <label className="form-label">Autor</label>

            <input
              type="text"
              className="form-control"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Ej. Gabriel García Márquez"
            />
          </div>

          {/* ISBN */}
          <div className="col-md-6">
            <label className="form-label">ISBN</label>

            <input
              type="text"
              className="form-control"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Ej. 9780307474728"
            />
          </div>

          {/* Año */}
          <div className="col-md-4">
            <label className="form-label">Año de publicación</label>

            <input
              type="number"
              className="form-control"
              name="publishedAt"
              value={formData.publishedAt}
              onChange={handleChange}
              placeholder="2026"
            />
          </div>

          {/* Copias */}
          <div className="col-md-4">
            <label className="form-label">Copias</label>

            <input
              type="number"
              min="1"
              className="form-control"
              name="copies"
              value={formData.copies}
              onChange={handleChange}
            />
          </div>

          {/* Disponibles */}
          <div className="col-md-4">
            <label className="form-label">Disponibles</label>

            <input
              type="number"
              min="0"
              className="form-control"
              name="available"
              value={formData.available}
              onChange={handleChange}
            />
          </div>

          {/* Imagen */}
          <div className="col-12">
            <label className="form-label">URL de imagen</label>

            <input
              type="url"
              className="form-control"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          {/* Categoría */}
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
      </Modal>

      {/* ==========================
          Estadísticas y búsqueda
      ========================== */}
      <div className="row g-4 mb-4">
        {/* Total de libros */}
        <div className="col-md-6">
          <div className="alert alert-light border shadow-sm rounded-3 h-100 mb-0 d-flex align-items-center">
            <i className="bi bi-book-fill me-2 text-primary"></i>
            Total de libros:
            <strong className="ms-1">{books.length}</strong>
          </div>
        </div>

        {/* Buscador */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex align-items-center">
              <div className="d-flex w-100">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Buscar libro..."
                  aria-label="Buscar libro"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================
          Tabla
      ========================== */}

      {/* No existen libros */}
      {books.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-journal-x display-1 text-secondary"></i>

          <h3>No hay libros registrados</h3>

          <p className="text-muted">Agrega el primer libro para comenzar.</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        /* No hay resultados de búsqueda */
        <div className="text-center py-5">
          <i className="bi bi-search display-1 text-secondary"></i>

          <h3>No se encontraron libros</h3>

          <p className="text-muted">
            No hay libros que coincidan con "{searchTerm}".
          </p>
        </div>
      ) : (
        /* Tabla con resultados */
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
                  {filteredBooks.map((book) => (
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
    </div>
  );
}
