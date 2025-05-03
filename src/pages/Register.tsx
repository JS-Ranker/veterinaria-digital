import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Obtener usuarios existentes o inicializar array
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Verificar si el usuario ya existe
    const userExists = users.some((user: any) => user.email === formData.email);

    if (userExists) {
      alert("Este correo ya está registrado");
      return;
    }

    // Agregar nuevo usuario
    const newUser = {
      ...formData,
      pets: [], // Inicializar array de mascotas vacío
    };

    // Guardar en localStorage
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    // Guardar usuario actual en sesión
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    // Redirigir al perfil
    navigate("/user");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card p-4">
            <div className="d-flex align-items-center mb-4">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-link text-decoration-none p-0 me-3"
              >
                <FaArrowLeft size={20} color="#4b3f72" />
              </button>
              <h2 className="mb-0" style={{ color: "#4b3f72" }}>
                Registro
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="form-label fw-bold"
                  style={{ color: "#4b3f72" }}
                >
                  Nombre del Dueño
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ingresa tu nombre completo"
                  style={{ borderColor: "#ddd" }}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="form-label fw-bold"
                  style={{ color: "#4b3f72" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
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
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Crea una contraseña segura"
                  style={{ borderColor: "#ddd" }}
                  required
                />
              </div>

              <hr className="my-4" />

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-bold"
                style={{ backgroundColor: "#ff9a76", border: "none" }}
              >
                REGISTRARSE
              </button>

              <div className="text-center mt-3">
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "#4b3f72", fontWeight: "500" }}
                >
                  VOLVER A INICIO
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
