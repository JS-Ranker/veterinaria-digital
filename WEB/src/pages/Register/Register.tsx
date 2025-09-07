import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaIdCard,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaPaw,
  FaCheckCircle
} from "react-icons/fa";
import styles from "./Register.module.css";
import { apiService } from "../../services/duenos";
import { validarRut } from "../../utils/rutValidador";

const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: ""
  });

  // Efecto para crear confeti cuando el registro es exitoso
  useEffect(() => {
    if (registrationSuccess) {
      createConfetti();
      // Redirigir después de mostrar la animación
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, navigate]);

  // Función para crear el efecto confeti
  const createConfetti = () => {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = styles.confettiContainer;
    document.body.appendChild(confettiContainer);

    // Crear 100 piezas de confeti
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = styles.confetti;
      
      // Asignar colores aleatorios de la paleta
      const colors = ['#2FB8C6', '#A9E5BB', '#FF8C70'];
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Posición inicial aleatoria
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 3}s`;
      confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
      
      confettiContainer.appendChild(confetti);
    }

    // Limpiar el confeti después de la animación
    setTimeout(() => {
      if (document.body.contains(confettiContainer)) {
        document.body.removeChild(confettiContainer);
      }
    }, 5000);
  };

  const formatRut = (rut: string): string => {
    // Eliminar cualquier carácter que no sea número ni 'k'/'K'
    const clean = rut.replace(/[^0-9kK]/g, "");
  
    if (clean.length <= 1) return clean;
  
    // Separar dígito verificador
    const body = clean.slice(0, -1);
    const dv = clean.slice(-1);
  
    return `${body}-${dv}`;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "rut") {
      // Permitir solo números, k/K y el guión
      const cleanValue = value.replace(/[^0-9kK-]/g, "");
      
      // Formatear el RUT con guión
      const formattedRut = formatRut(cleanValue.replace(/-/g, ""));
      
      setFormData((prev) => ({ ...prev, [name]: formattedRut }));

      if (formattedRut && !validarRut(formattedRut)) {
        setErrors((prev) => ({ ...prev, rut: "RUT inválido" }));
      } else {
        setErrors((prev) => ({ ...prev, rut: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateField(name, value);
    }
  };

  const validateField = (name: string, value: string): void => {
    switch (name) {
      case "nombre":
        setErrors((prev) => ({
          ...prev,
          nombre: !value
            ? "El nombre es obligatorio"
            : value.length < 2
            ? "Debe tener al menos 2 caracteres"
            : "",
        }));
        break;

      case "apellido":
        setErrors((prev) => ({
          ...prev,
          apellido: !value
            ? "El apellido es obligatorio"
            : value.length < 2
            ? "Debe tener al menos 2 caracteres"
            : ""
        }));
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors((prev) => ({
          ...prev,
          email: !value
            ? "El email es obligatorio"
            : !emailRegex.test(value)
            ? "Formato inválido"
            : ""
        }));
        break;

      case "telefono":
        const phoneRegex = /^\+?[0-9]{9,15}$/;
        setErrors((prev) => ({
          ...prev,
          telefono: !value
            ? "El teléfono es obligatorio"
            : !phoneRegex.test(value.replace(/\s/g, ""))
            ? "Formato inválido (debe tener entre 9-15 dígitos)"
            : ""
        }));
        break;

      case "password":
        setErrors((prev) => ({
          ...prev,
          password: !value
            ? "La contraseña es obligatoria"
            : value.length < 6
            ? "Debe tener al menos 6 caracteres"
            : ""
        }));

        if (formData.confirmPassword && value !== formData.confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Las contraseñas no coinciden"
          }));
        }
        break;

      case "confirmPassword":
        setErrors((prev) => ({
          ...prev,
          confirmPassword: !value
            ? "Confirmar contraseña es obligatorio" 
            : value !== formData.password
            ? "Las contraseñas no coinciden"
            : ""
        }));
        break;

      default:
        break;
    }
  };

  const validateForm = () => {
    let valid = true;
  
    type FormKeys = keyof typeof formData;
    const newErrors: Partial<Record<FormKeys, string>> = {};
  
    Object.entries(formData).forEach(([key, value]) => {
      const fieldKey = key as FormKeys;
  
      if (!value) {
        newErrors[fieldKey] = "Este campo es obligatorio";
        valid = false;
      } else if (fieldKey === "rut" && !validarRut(value)) {
        newErrors.rut = "RUT inválido";
        valid = false;
      }
    });
  
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    setIsSubmitting(true);
  
 try {
  const response = await apiService.crearDueno(formData);
  setRegistrationSuccess(true);
  setIsSubmitting(false);
} catch (error: any) {
  console.error("Error en registro:", error);
  alert(error.response?.data?.error || "Error al registrar el dueño");
  setIsSubmitting(false);
}

  };
  
  return (
    <div className={styles.pageContainer}>
      {registrationSuccess ? (
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>
            <FaCheckCircle />
          </div>
          <h2 className={styles.successTitle}>¡Registro Exitoso!</h2>
          <p className={styles.successMessage}>
            Tu cuenta ha sido creada correctamente. Redirigiendo al login...
          </p>
        </div>
      ) : (
        <div className={styles.formContainer}>
          {/* Panel izquierdo con imagen y mensaje de bienvenida */}
          <div className={styles.leftPanel}>
            <div className={styles.logoContainer}>
              <div className={styles.logo}>
                <FaPaw />
              </div>
              <h1 className={styles.brandName}>HappyPet</h1>
            </div>
            
            <div className={styles.welcomeText}>
              <h2>¡Bienvenido a nuestra comunidad!</h2>
              <p>
                Únete a nuestra plataforma para poder gestionar el cuidado de tus mascotas
                de manera eficiente y sencilla. Tu registro te dará acceso a todas nuestras
                funcionalidades.
              </p>
            </div>
          </div>
          
          {/* Panel derecho con el formulario */}
          <div className={styles.rightPanel}>
            <div className={styles.formHeader}>
              <Link to="/login" className={styles.backLink}>
                <FaArrowLeft /> <span> </span>
              </Link>
              <h2 className={styles.formTitle}>Registro de Dueño</h2>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.registerForm}>
              <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre *</label>
                <div className={styles.inputContainer}>
                  <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    placeholder="Ingresa tu nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  <FaUser className={styles.inputIcon} />
                </div>
                {errors.nombre && <p className={styles.errorText}>{errors.nombre}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="apellido">Apellido *</label>
                <div className={styles.inputContainer}>
                  <input
                    id="apellido"
                    type="text"
                    name="apellido"
                    placeholder="Ingresa tu apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                  />
                  <FaUser className={styles.inputIcon} />
                </div>
                {errors.apellido && <p className={styles.errorText}>{errors.apellido}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="rut">RUT * (sin puntos, con guión)</label>
                <div className={styles.inputContainer}>
                  <input
                    id="rut"
                    type="text"
                    name="rut"
                    placeholder="Ej: 12345678-9"
                    value={formData.rut}
                    onChange={handleChange}
                  />
                  <FaIdCard className={styles.inputIcon} />
                </div>
                {errors.rut && <p className={styles.errorText}>{errors.rut}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Correo electrónico *</label>
                <div className={styles.inputContainer}>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <FaEnvelope className={styles.inputIcon} />
                </div>
                {errors.email && <p className={styles.errorText}>{errors.email}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="telefono">Teléfono *</label>
                <div className={styles.inputContainer}>
                  <input
                    id="telefono"
                    type="text"
                    name="telefono"
                    placeholder="+56 9 XXXX XXXX"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                  <FaPhone className={styles.inputIcon} />
                </div>
                {errors.telefono && <p className={styles.errorText}>{errors.telefono}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Contraseña *</label>
                <div className={styles.inputContainer}>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <FaLock className={styles.inputIcon} />
                </div>
                {errors.password && <p className={styles.errorText}>{errors.password}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirmar contraseña *</label>
                <div className={styles.inputContainer}>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Repite tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <FaLock className={styles.inputIcon} />
                </div>
                {errors.confirmPassword && (
                  <p className={styles.errorText}>{errors.confirmPassword}</p>
                )}
              </div>

              <div className={styles.formNote}>
                <p>* Todos los campos son obligatorios</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.registerButton} ${isSubmitting ? styles.loading : ""}`}
              >
                <div className={styles.buttonContent}>
                  {isSubmitting && <div className={styles.spinner}></div>}
                  {isSubmitting ? "Registrando..." : "Registrarse"}
                </div>
              </button>

              <div className={styles.loginLinkContainer}>
                ¿Ya tienes una cuenta? <Link to="/login" className={styles.loginLink}>Inicia sesión</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;