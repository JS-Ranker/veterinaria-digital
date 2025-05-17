import { Link } from "react-router-dom";
import styles from "./EspecialidadesPage.module.css";

const EspecialidadesPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nuestras Especialidades Veterinarias</h1>
      <p className={styles.subtitle}>
        Contamos con especialistas altamente capacitados en cada área
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Cardiología Veterinaria</h2>
          <p>
            Diagnóstico y tratamiento de enfermedades del corazón y sistema
            circulatorio.
          </p>
          <Link to="/cardiologia" className={styles.link}>
            Ver más
          </Link>
        </div>

        <div className={styles.card}>
          <h2>Endocrinología Veterinaria</h2>
          <p>
            Tratamiento de desórdenes hormonales como diabetes y problemas
            tiroideos.
          </p>
          <Link to="/endocrinologia" className={styles.link}>
            Ver más
          </Link>
        </div>

        <div className={styles.card}>
          <h2>Oncología Veterinaria</h2>
          <p>Diagnóstico y tratamiento del cáncer en animales.</p>
          <Link to="/oncologia" className={styles.link}>
            Ver más
          </Link>
        </div>

        <div className={styles.card}>
          <h2>Gastroenterología Veterinaria</h2>
          <p>Enfermedades del sistema digestivo, hígado y páncreas.</p>
          <Link to="/gastroenterologia" className={styles.link}>
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EspecialidadesPage;
