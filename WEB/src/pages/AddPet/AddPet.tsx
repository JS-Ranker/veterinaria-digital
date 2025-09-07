import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPaw, FaArrowLeft } from "react-icons/fa";

interface PetData {
  name: string;
  type: string;
  age: string;
}

interface UserData {
  email: string;
  name: string;
  password: string;
  pets?: PetData[];
}

const AddPet = () => {
  const navigate = useNavigate();
  const [petData, setPetData] = useState<PetData>({
    name: "",
    type: "",
    age: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validar datos de la mascota
    if (!petData.name || !petData.type || !petData.age) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Obtener usuario actual
    const currentUserString = localStorage.getItem("currentUser");
    const currentUser: UserData = currentUserString
      ? JSON.parse(currentUserString)
      : null;

    // Obtener todos los usuarios
    const usersString = localStorage.getItem("users");
    const users: UserData[] = usersString ? JSON.parse(usersString) : [];

    // Verificar si hay usuario logueado
    if (!currentUser?.email) {
      navigate("/login");
      return;
    }

    // Crear copia actualizada del usuario
    const updatedUser: UserData = {
      ...currentUser,
      pets: [...(currentUser.pets || []), petData],
    };

    // Actualizar lista de usuarios
    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? updatedUser : user
    );

    // Guardar en localStorage
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Redirigir al perfil
    navigate("/user");
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-link text-decoration-none"
          style={{ color: "#4b3f72" }}
        >
          <FaArrowLeft size={20} />
        </button>
        <h2 className="mb-0 text-center" style={{ color: "#4b3f72" }}>
          <FaPaw className="me-2" /> Registrar Mascota
        </h2>
        <div style={{ width: 20 }}></div>
      </div>

      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="form-label fw-bold d-block"
              style={{ color: "#4b3f72", marginBottom: "8px" }}
            >
              Nombre de la Mascota
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={petData.name}
              onChange={handleChange}
              style={{
                border: "none",
                borderBottom: "2px solid #4b3f72",
                borderRadius: "0",
                padding: "10px 0",
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="form-label fw-bold d-block"
              style={{ color: "#4b3f72", marginBottom: "8px" }}
            >
              Tipo de Mascota
            </label>
            <input
              type="text"
              className="form-control"
              name="type"
              value={petData.type}
              onChange={handleChange}
              style={{
                border: "none",
                borderBottom: "2px solid #4b3f72",
                borderRadius: "0",
                padding: "10px 0",
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="form-label fw-bold d-block"
              style={{ color: "#4b3f72", marginBottom: "8px" }}
            >
              Edad
            </label>
            <input
              type="text"
              className="form-control"
              name="age"
              value={petData.age}
              onChange={handleChange}
              style={{
                border: "none",
                borderBottom: "2px solid #4b3f72",
                borderRadius: "0",
                padding: "10px 0",
              }}
              required
            />
          </div>

          <hr className="my-4" style={{ borderColor: "#ddd" }} />

          <div className="d-flex flex-column gap-2">
            <button
              type="submit"
              className="btn btn-primary py-2"
              style={{
                backgroundColor: "#ff9a76",
                border: "none",
                borderRadius: "10px",
                fontWeight: "500",
              }}
            >
              REGISTRAR MASCOTA
            </button>

            <Link
              to="/user"
              className="btn btn-outline-secondary py-2 text-center"
              style={{
                color: "#4b3f72",
                borderColor: "#4b3f72",
                borderRadius: "10px",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              VOLVER A INICIO
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
