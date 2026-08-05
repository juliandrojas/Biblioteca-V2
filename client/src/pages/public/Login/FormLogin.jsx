import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, saveToken, saveUser } from "../../../services/authService.js";
export default function FormLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        username,
        password,
      });

      const { user, token } = response.data;

      saveToken(token);
      saveUser(user);

      if (user.role === "ADMIN") {
        alert("Bienvenido Administrador");
        navigate("/admin");
      } else {
        alert("Bienvenido Usuario");
        navigate("/user");
      }
    } catch (error) {
      console.error(error);

      alert("Usuario o contraseña incorrectos");
    }
  };
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div
          className="card shadow-lg p-4 rounded-4"
          //style={{ maxWidth: "400px", width: "100%" }}
        >
          <div className="card-body">
            <h2 className="card-title text-center fw-bold mb-4 text-primary">
              Iniciar Sesión
            </h2>

            {/* Cambiado a onSubmit */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="usernameInput"
                  className="form-label fw-semibold"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="emailInput"
                  placeholder="nombre.apellido"
                  value={username} // Sincronizado con el estado
                  onChange={(e) => setUsername(e.target.value)} // Corregido e.target.value
                  required
                />
              </div>

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
                  value={password} // Sincronizado con el estado
                  onChange={(e) => setPassword(e.target.value)} // Corregido e.target.value
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-bold mb-3"
              >
                Ingresar
              </button>
            </form>

            <div className="text-center mt-3">
              <span className="text-muted small">
                ¿Se te olvidó tu contraseña?{" "}
              </span>
              <a
                href="/recovery"
                className="text-primary fw-bold text-decoration-none small"
              >
                Recuperar
              </a>
            </div>
            <div className="text-center mt-3">
              <span className="text-muted small">¿No tienes una cuenta? </span>
              <a
                href="/register"
                className="text-primary fw-bold text-decoration-none small"
              >
                Regístrate
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
