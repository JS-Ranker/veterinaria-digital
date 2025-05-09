import {
  FaPaw,
  FaPlus,
  FaArrowLeft,
  FaDog,
  FaCat,
  FaDove,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const getPetIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "perro":
      return <FaDog className="me-2" />;
    case "gato":
      return <FaCat className="me-2" />;
    default:
      return <FaDove className="me-2" />;
  }
};

const User = () => {
  const navigate = useNavigate();

  // Obtener usuario actual de localStorage
  const userData = JSON.parse(localStorage.getItem("currentUser") || "{}");

  // Si no hay usuario logueado, redirigir al login
  if (!userData.email) {
    navigate("/login");
    return null;
  }

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
          <FaPaw className="me-2" /> Mi Perfil
        </h2>
        <div style={{ width: 20 }}></div>
      </div>

      <div className="card p-4 mb-4 shadow-sm">
        <h3
          style={{
            color: "#4b3f72",
            borderBottom: "2px solid #ff9a76",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          Información del Usuario
        </h3>

        <div className="mb-3">
          <p className="mb-2">
            <span className="fw-bold" style={{ color: "#4b3f72" }}>
              Nombre:{" "}
            </span>
            <span style={{ color: "#4b3f72" }}>{userData.name}</span>
          </p>
          <p className="mb-2">
            <span className="fw-bold" style={{ color: "#4b3f72" }}>
              Correo:{" "}
            </span>
            <span style={{ color: "#4b3f72" }}>{userData.email}</span>
          </p>
        </div>
      </div>

      <div className="card p-4 shadow-sm">
        <h4
          style={{
            color: "#4b3f72",
            borderBottom: "2px solid #ff9a76",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          Mis Mascotas
        </h4>

        {userData.pets && userData.pets.length > 0 ? (
          <div className="row">
            {userData.pets.map((pet: any, index: number) => (
              <div key={index} className="col-md-6 mb-3">
                <div
                  className="card p-3"
                  style={{ borderLeft: "4px solid #ff9a76" }}
                >
                  <div className="d-flex align-items-center mb-2">
                    {getPetIcon(pet.type)}
                    <h5 className="mb-0" style={{ color: "#4b3f72" }}>
                      {pet.name}
                    </h5>
                  </div>
                  <p className="mb-1" style={{ color: "#4b3f72" }}>
                    <span className="fw-bold">Tipo:</span> {pet.type}
                  </p>
                  <p className="mb-0" style={{ color: "#4b3f72" }}>
                    <span className="fw-bold">Edad:</span> {pet.age}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "#4b3f72" }}>No tienes mascotas registradas.</p>
        )}

        <div className="d-flex flex-column gap-2 mt-4">
          <Link
            to="/add-pet"
            className="btn btn-primary d-flex align-items-center justify-content-center gap-2 py-2"
            style={{
              backgroundColor: "#ff9a76",
              border: "none",
              borderRadius: "10px",
              fontWeight: "500",
            }}
          >
            <FaPlus /> AGREGAR MASCOTA
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              navigate("/login");
            }}
            className="btn btn-outline-secondary py-2"
            style={{
              color: "#4b3f72",
              borderColor: "#4b3f72",
              borderRadius: "10px",
              fontWeight: "500",
            }}
          >
            CERRAR SESIÓN
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
