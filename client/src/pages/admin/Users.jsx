import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { createUser, getUsers, updateUser } from "../../services/userService";

export default function Users() {
  // ==========================
  // Estados
  // ==========================
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

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
      console.error(error);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Ocurrió un error",
      );
    }
  };

  // ==========================
  // Filtrar usuarios
  // ==========================
  const filteredUsers =
    searchTerm.trim() === ""
      ? users
      : users.filter((user) => {
          const search = searchTerm.toLowerCase().trim();

          return (
            user.name?.toLowerCase().includes(search) ||
            user.lastname?.toLowerCase().includes(search) ||
            user.username?.toLowerCase().includes(search) ||
            user.email?.toLowerCase().includes(search) ||
            user.role?.toLowerCase().includes(search)
          );
        });

  return (
    <div className="container py-4">
      {/* ==========================
          Encabezado
      ========================== */}
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

      {/* ==========================
          Estadísticas y búsqueda
      ========================== */}
      <div className="row g-4 mb-4">
        {/* Total de usuarios */}
        <div className="col-md-6">
          <div className="alert alert-light border shadow-sm rounded-3 h-100 mb-0 d-flex align-items-center">
            <i className="bi bi-people-fill me-2 text-primary"></i>
            Total de usuarios:
            <strong className="ms-1">{totalUsers}</strong>
          </div>
        </div>

        {/* Buscador */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex align-items-center">
              <input
                className="form-control"
                type="search"
                placeholder="Buscar usuario..."
                aria-label="Buscar usuario"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================
          Tabla
      ========================== */}

      {/* No hay usuarios */}
      {users.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-people display-1 text-secondary"></i>

          <h3 className="mt-3">No hay usuarios registrados</h3>

          <p className="text-muted">
            Cuando se registren usuarios aparecerán aquí.
          </p>
        </div>
      ) : filteredUsers.length === 0 ? (
        /* No hay resultados */
        <div className="text-center py-5">
          <i className="bi bi-search display-1 text-secondary"></i>

          <h3 className="mt-3">No se encontraron usuarios</h3>

          <p className="text-muted">
            No hay usuarios que coincidan con "{searchTerm}".
          </p>
        </div>
      ) : (
        /* Tabla */
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
                  {filteredUsers.map((user) => (
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

      {/* ==========================
          Modal
      ========================== */}
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        title={selectedUser ? "Editar usuario" : "Registrar usuario"}
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
              onClick={handleSaveUser}
            >
              <i className="bi bi-check-circle me-2"></i>

              {selectedUser ? "Actualizar" : "Guardar"}
            </button>
          </>
        }
      >
        <div className="row g-3">
          {/* Nombre */}
          <div className="col-md-6">
            <label className="form-label">Nombre</label>

            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Apellido */}
          <div className="col-md-6">
            <label className="form-label">Apellido</label>

            <input
              type="text"
              className="form-control"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          {/* Usuario */}
          <div className="col-12">
            <label className="form-label">Usuario</label>

            <input
              type="text"
              className="form-control"
              value={formData.username}
              readOnly
            />

            <small className="text-muted">
              El usuario se genera automáticamente a partir del nombre y
              apellido.
            </small>
          </div>

          {/* Correo */}
          <div className="col-12">
            <label className="form-label">Correo</label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Contraseña */}
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
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={
                selectedUser ? "Nueva contraseña (opcional)" : "Contraseña"
              }
            />
          </div>

          {/* Rol */}
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
