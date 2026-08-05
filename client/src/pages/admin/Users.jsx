import { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import { createUser, getUsers, updateUser } from "../../services/userService";

export default function Users() {
  // ==========================
  // Estados
  // ==========================
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  // ==========================
  // Obtener usuarios
  // ==========================
  const fetchUsers = async () => {
    try {
      const response = await getUsers();

      setUsers(response.data.users);
      setTotalUsers(response.data.total);
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ==========================
  // Actualizar formulario
  // ==========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...formData,
      [name]: value,
    };

    if (name === "name" || name === "lastname") {
      updatedForm.username = `${updatedForm.name}.${updatedForm.lastname}`
        .toLowerCase()
        .replace(/\s+/g, "");
    }

    setFormData(updatedForm);
  };

  // ==========================
  // Limpiar formulario
  // ==========================
  const clearForm = () => {
    setFormData({
      name: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      role: "USER",
    });
  };

  // ==========================
  // Cerrar modal
  // ==========================
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    clearForm();
  };

  // ==========================
  // Abrir modal para crear
  // ==========================
  const handleNewUser = () => {
    setSelectedUser(null);
    clearForm();
    setShowModal(true);
  };

  // ==========================
  // Abrir modal para editar
  // ==========================
  const handleEditUser = (user) => {
    setSelectedUser(user);

    setFormData({
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
    });

    setShowModal(true);
  };

  // ==========================
  // Guardar usuario
  // ==========================
  const handleSaveUser = async () => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, formData);

        alert("Usuario actualizado correctamente");
      } else {
        await createUser(formData);

        alert("Usuario creado correctamente");
      }

      await fetchUsers();

      handleCloseModal();
    } catch (error) {
      alert(error.response?.data?.error || "Ocurrió un error");
    }
  };
  return (
    <div className="container py-4">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h1 className="fw-bold mb-1">Usuarios</h1>
          <p className="text-muted mb-0">
            Administra los usuarios registrados.
          </p>
        </div>

        <button className="btn btn-primary shadow" onClick={handleNewUser}>
          <i className="bi bi-person-plus-fill me-2"></i>
          Nuevo usuario
        </button>
      </div>

      {/* Estadísticas */}
      <div className="alert alert-light border shadow-sm rounded-3 mb-4">
        <i className="bi bi-people-fill me-2 text-primary"></i>
        Total de usuarios:
        <strong> {totalUsers}</strong>
      </div>

      {/* Tabla */}
      {users.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-people display-1 text-secondary"></i>

          <h3 className="mt-3">No hay usuarios registrados</h3>

          <p className="text-muted">
            Cuando se registren usuarios aparecerán aquí.
          </p>
        </div>
      ) : (
        <div className="card border-0 shadow rounded-4">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>

                      <td>
                        <strong>
                          {user.name} {user.lastname}
                        </strong>
                      </td>

                      <td>{user.username}</td>

                      <td>{user.email}</td>

                      <td>
                        <span
                          className={`badge ${
                            user.role === "ADMIN" ? "bg-danger" : "bg-primary"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="text-center">
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          title="Editar"
                          onClick={() => handleEditUser(user)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          title="Eliminar"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
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
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        title={selectedUser ? "Editar usuario" : "Registrar usuario"}
        footer={
          <>
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              Cancelar
            </button>

            <button className="btn btn-success" onClick={handleSaveUser}>
              <i className="bi bi-check-circle me-2"></i>

              {selectedUser ? "Actualizar" : "Guardar"}
            </button>
          </>
        }
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>

            <input
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Apellido</label>

            <input
              className="form-control"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Usuario</label>

            <input
              className="form-control"
              value={formData.username}
              readOnly
            />
          </div>

          <div className="col-12">
            <label className="form-label">Correo</label>

            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Contraseña{" "}
              {selectedUser && (
                <small className="text-muted">
                  (Déjala vacía para conservar la actual)
                </small>
              )}
            </label>

            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={
                selectedUser ? "Nueva contraseña (opcional)" : "Contraseña"
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Rol</label>

            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="USER">Usuario</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
