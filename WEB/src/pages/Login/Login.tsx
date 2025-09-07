import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaIdCard, FaLock, FaPaw, FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Login.module.css";
import { apiService } from "../../services/duenos";

interface LoginResponse {
  data: {
    rut: string;
    // Otros campos que pueda tener la respuesta
  }
}

interface ApiError {
  response?: {
    data?: {
      error?: string;
    }
  }
}

const Login = () => {
  const navigate = useNavigate();
  const [rut, setRut] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loadingSuccess, setLoadingSuccess] = useState<boolean>(false);

  // Formatear RUT automáticamente
  const formatRut = (rutValue: string): string => {
    // Eliminar cualquier carácter que no sea número o K/k
    let cleaned = rutValue.replace(/[^0-9kK]/g, '');
    
    // Convertir a mayúscula si termina en k
    if (cleaned.toLowerCase().endsWith('k')) {
      cleaned = cleaned.slice(0, -1) + 'K';
    }
    
    // Si tiene largo suficiente para añadir guión (>1)
    if (cleaned.length > 1) {
      // Separa el dígito verificador
      const body = cleaned.slice(0, -1);
      const dv = cleaned.slice(-1);
      return `${body}-${dv}`;
    }
    
    return cleaned;
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    // Solo actualizamos si el RUT tiene un formato válido después de la limpieza
    const formatted = formatRut(value);
    setRut(formatted);
  };

  // Cuenta regresiva para redirección
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (success && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (success && countdown === 0) {
      navigate("/");
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [success, countdown, navigate]);

  // Efecto confeti al iniciar sesión con éxito
  useEffect(() => {
    if (success) {
      createConfetti();
    }
  }, [success]);

  const createConfetti = (): void => {
    const container = document.querySelector(`.${styles.successModalOverlay}`);
    if (!container) return;
    
    // Crear piezas de confeti
    const colors = ['#2FB8C6', '#A9E5BB', '#FF8C70', '#FFD166', '#8AACFF'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = styles.confetti;
      
      // Generar posición y color aleatorios
      const left = Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = Math.random() * 3;
      const duration = 1 + Math.random() * 2;
      
      // Aplicar estilos
      confetti.style.left = `${left}%`;
      confetti.style.backgroundColor = color;
      confetti.style.animation = `${styles.confettiDrop} ${duration}s ${delay}s ease-out forwards`;
      
      container.appendChild(confetti);
      
      // Limpiar confeti después de la animación
      setTimeout(() => {
        if (container.contains(confetti)) {
          container.removeChild(confetti);
        }
      }, (delay + duration) * 1000);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsSubmitting(true);
    
    try {
      const response = await apiService.loginDueno({ rut, password }) as LoginResponse;
      
      // Mostrar el indicador de carga por 2 segundos antes de mostrar el éxito
      setLoadingSuccess(true);
      
      setTimeout(() => {
        // Guardamos la sesión en localStorage
        localStorage.setItem("rut", response.data.rut);
        
        // Mostrar modal de éxito
        setLoadingSuccess(false);
        setSuccess(true);
        setIsSubmitting(false);
      }, 2000);
      
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.error || "Error al iniciar sesión");
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.leftPanel}>
          <div className={styles.logoContainer}>
            <FaPaw className={styles.logo} />
            <h1 className={styles.brandName}>HappyPet</h1>
          </div>
          <div className={styles.welcomeText}>
            <h2>¡Bienvenido de nuevo!</h2>
            <p>Inicia sesión para acceder a los servicios y gestionar el cuidado de tus mascotas</p>
          </div>
        </div>
        
        <div className={styles.rightPanel}>
          <div className={styles.formHeader}>
            <Link to="/" className={styles.backLink}>
              <FaArrowLeft /> <span>   </span>
            </Link>
            <h2 className={styles.formTitle}>Iniciar Sesión</h2>
          </div>
          
          <form id="loginForm" className={styles.loginForm} onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="rut">RUT</label>
              <div className={styles.inputContainer}>
                <FaIdCard className={styles.inputIcon} />
                <input
                  type="text"
                  id="rut"
                  name="rut"
                  value={rut}
                  onChange={handleRutChange}
                  placeholder="Ingresa tu RUT (ej: 12345678-9)"
                  required
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña</label>
              <div className={styles.inputContainer}>
                <FaLock className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <div 
                  className={styles.passwordToggle} 
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            
            {error && <div className={styles.errorMessage}>{error}</div>}
            
            {/* Indicador de carga antes de mostrar el éxito */}
            {loadingSuccess && (
              <div className={styles.successLoadingOverlay}>
                <div className={styles.successLoadingSpinner}>
                  <div className={styles.loadingRing}></div>
                  <p>Verificando credenciales...</p>
                </div>
              </div>
            )}
            
            {/* Popup Modal de Éxito */}
            {success && (
              <div className={styles.successModalOverlay}>
                <div className={styles.successModal}>
                  <div className={styles.successIconCircle}>
                    <FaCheckCircle className={styles.modalSuccessIcon} />
                  </div>
                  <h2 className={styles.modalTitle}>¡Inicio de sesión exitoso!</h2>
                  <p className={styles.modalMessage}>
                    Bienvenido de nuevo a HappyPet.
                  </p>
                  <p className={styles.redirectText}>
                    Redirigiendo al panel en {countdown} segundos...
                  </p>
                </div>
              </div>
            )}
            
            <button 
              type="submit" 
              className={`${styles.loginButton} ${isSubmitting ? styles.loading : ''}`}
              disabled={isSubmitting || success || loadingSuccess}
            >
              {isSubmitting ? (
                <div className={styles.buttonContent}>
                  <span className={styles.spinner}></span>
                  <span>Verificando...</span>
                </div>
              ) : (
                <span>Ingresar</span>
              )}
            </button>
            
            <div className={styles.registerLinkContainer}>
              <p>¿No tienes una cuenta? <Link to="/register" className={styles.registerLink}>Regístrate aquí</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;