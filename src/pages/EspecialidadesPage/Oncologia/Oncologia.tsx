import styles from "./Oncologia.module.css";

const Oncologia = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cardiología Veterinaria</h1>

      <div className={styles.content}>
        <div className={styles.textSection}>
          <p className={styles.intro}>
            La cardiología veterinaria se enfoca en diagnosticar y tratar
            enfermedades del corazón y del sistema circulatorio en animales.
            Detectar problemas cardíacos a tiempo puede mejorar
            significativamente la calidad de vida de tu mascota.
          </p>

          <h2>Síntomas comunes</h2>
          <ul className={styles.symptomsList}>
            <li>Tos persistente</li>
            <li>Respiración dificultosa</li>
            <li>Abdomen hinchado o distendido</li>
            <li>Colapso o desmayo</li>
            <li>Debilidad generalizada</li>
            <li>Tolerancia al ejercicio reducida</li>
          </ul>

          <h2>Exámenes que realizamos</h2>
          <ul className={styles.examsList}>
            <li>Electrocardiograma (ECG)</li>
            <li>Ecocardiografía</li>
            <li>Radiografías torácicas</li>
            <li>Presión arterial</li>
            <li>Análisis de sangre específicos</li>
          </ul>
        </div>

        <div className={styles.imageSection}>
          <img
            src="/images/cardiologia-veterinaria.jpg"
            alt="Cardiología veterinaria"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Oncologia;
