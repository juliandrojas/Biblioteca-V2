import { useState } from "react";
import { register } from "../../../services/authService.js";
export default function FormRegister() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register({
        name,
        lastname,
        email,
        password,
      });

      console.log("Usuario registrado:", response.data);

      alert("Usuario registrado correctamente");

      // Aquí posteriormente puedes redirigir al login
      // navigate("/login");
    } catch (error) {
      console.error(
        "Error al registrar usuario:",
        error.response?.data || error,
      );

      alert(
        error.response?.data?.error || "No fue posible registrar el usuario",
      );
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="card shadow-lg p-4 rounded-4">
          <div className="card-body">
            <h2 className="card-title text-center fw-bold mb-4 text-primary">
              Registrarse
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Nombre */}
              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label fw-semibold">
                  Nombre
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  placeholder="Nombre"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Apellido */}
              <div className="mb-3">
                <label
                  htmlFor="lastnameInput"
                  className="form-label fw-semibold"
                >
                  Apellido
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="lastnameInput"
                  placeholder="Apellido"
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>

              {/* Correo */}
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label fw-semibold">
                  Correo Electrónico
                </label>

                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  placeholder="correo@ejemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Contraseña */}
              <div className="mb-3">
                <label
                  htmlFor="passwordInput"
                  className="form-label fw-semibold"
                >
                  Contraseña
                </label>

                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-bold mb-3"
              >
                Registrarse
              </button>
            </form>

            <div className="text-center mt-3">
              <span className="text-muted small">¿Ya tienes una cuenta? </span>

              <a
                href="/login"
                className="text-primary fw-bold text-decoration-none small"
              >
                Inicia sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
