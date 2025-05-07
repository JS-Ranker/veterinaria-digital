import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Obtener usuarios registrados
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Buscar usuario que coincida
    const user = users.find(
      (user: any) =>
        user.email === loginData.email && user.password === loginData.password
    );

    if (user) {
      // Guardar usuario en sesión
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Redirigir al perfil
      navigate("/user");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card p-4">
            <div className="d-flex align-items-center mb-4">
              <Link to="/" className="me-3 text-decoration-none">
                <FaArrowLeft size={20} color="#4b3f72" />
              </Link>
              <h2 className="mb-0" style={{ color: "#4b3f72" }}>
                Iniciar Sesión
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="form-label fw-bold"
                  style={{ color: "#4b3f72" }}
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="Ingresa tu correo electrónico"
                  style={{ borderColor: "#ddd" }}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="form-label fw-bold"
                  style={{ color: "#4b3f72" }}
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                  style={{ borderColor: "#ddd" }}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-bold"
                style={{ backgroundColor: "#ff9a76", border: "none" }}
              >
                INGRESAR
              </button>

              <div className="text-center mt-3">
                <p style={{ color: "#4b3f72" }}>
                  ¿No tienes una cuenta?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-none"
                    style={{ color: "#ff9a76", fontWeight: "500" }}
                  >
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
