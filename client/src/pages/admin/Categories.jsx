import { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../services/categoryService";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    fetchCategories();
  }, []);

  // ==========================
  // Abrir modal para crear
  // ==========================
  const handleCreate = () => {
    setSelectedCategory(null);
    setNewCategory("");
    setShowModal(true);
  };

  // ==========================
  // Abrir modal para editar
  // ==========================
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setNewCategory(category.name);
    setShowModal(true);
  };

  // ==========================
  // Crear o editar
  // ==========================
  const handleSaveCategory = async () => {
    if (!newCategory.trim()) {
      alert("Debe ingresar un nombre.");
      return;
    }

    const exists = categories.some(
      (category) =>
        category.id !== selectedCategory?.id &&
        category.name.trim().toLowerCase() === newCategory.trim().toLowerCase(),
    );

    if (exists) {
      alert("La categoría ya existe.");
      return;
    }

    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, {
          name: newCategory.trim(),
        });

        alert("Categoría actualizada correctamente.");
      } else {
        await createCategory({
          name: newCategory.trim(),
        });

        alert("Categoría creada correctamente.");
      }

      await fetchCategories();

      setShowModal(false);
      setNewCategory("");
      setSelectedCategory(null);
    } catch (error) {
      alert(error.response?.data?.error || "Ocurrió un error.");
    }
  };

  // ==========================
  // Eliminar
  // ==========================
  const handleDelete = async (id) => {
    const confirmDelete = confirm("¿Está seguro de eliminar esta categoría?");

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      await fetchCategories();

      alert("Categoría eliminada correctamente.");
    } catch (error) {
      alert(error.response?.data?.error || "No fue posible eliminar.");
    }
  };

  return (
    <div className="container py-4">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h1 className="fw-bold">Categorías</h1>

          <p className="text-muted">
            Administra las categorías disponibles en la biblioteca.
          </p>
        </div>

        <button className="btn btn-primary shadow" onClick={handleCreate}>
          <i className="bi bi-plus-circle-fill me-2"></i>
          Nueva categoría
        </button>
      </div>

      {/* Estadística */}
      <div className="alert alert-light border shadow-sm mb-4">
        <i className="bi bi-collection-fill me-2 text-primary"></i>
        Total de categorías:
        <strong> {categories.length}</strong>
      </div>

      {/* Modal */}

      {/* <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedCategory(null);
          setNewCategory("");
        }}
        title={selectedCategory ? "Editar categoría" : "Nueva categoría"}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowModal(false);
                setSelectedCategory(null);
                setNewCategory("");
              }}
            >
              Cancelar
            </button>

            <button className="btn btn-success" onClick={handleSaveCategory}>
              <i className="bi bi-check-circle me-2"></i>

              {selectedCategory ? "Actualizar" : "Guardar"}
            </button>
          </>
        }
      >
        <input
          className="form-control"
          placeholder="Nombre de la categoría"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
      </Modal> */}

      {/* Listado */}

      {categories.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-folder-x display-1 text-secondary"></i>

          <h3>No hay categorías</h3>

          <p className="text-muted">Crea la primera categoría para comenzar.</p>
        </div>
      ) : (
        <div className="row g-4">
          {categories.map((category) => (
            <div className="col-md-4" key={category.id}>
              <div className="card category-card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body text-center">
                  <div
                    className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: 70,
                      height: 70,
                    }}
                  >
                    <i className="bi bi-bookmark-fill fs-2 text-primary"></i>
                  </div>

                  <h5 className="fw-bold">{category.name}</h5>

                  <p className="text-muted small mb-4">Categoría disponible</p>

                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(category)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(category.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
