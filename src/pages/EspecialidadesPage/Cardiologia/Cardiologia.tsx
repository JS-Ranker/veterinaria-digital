import styles from "./Cardiologia.module.css";

const Cardiologia = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CARDIOLOGÍA VETERINARIA</h1>

      <div className={styles.content}>
        <div className={styles.textSection}>
          <p className={styles.description}>
            Detectar una enfermedad cardíaca a tiempo puede mejorar el
            pronóstico a largo plazo de su mascota y las perspectivas de una
            calidad de vida óptima. Es por eso que los exámenes físicos de
            rutina con su veterinario de atención primaria son esenciales para
            el corazón y la salud general de su mascota.
          </p>

          <p className={styles.symptomsIntro}>
            Los síntomas son más fáciles de detectar en perros que en gatos,
            pero los siguientes signos pueden ser indicios de un problema
            cardíaco:
          </p>

          <ul className={styles.symptomsList}>
            <li>Tos persistente</li>
            <li>Respiración dificultosa</li>
            <li>Abdomen hinchado o distendido</li>
            <li>Colapso o desmayo</li>
            <li>Debilidad</li>
            <li>Inquisitud</li>
            <li>Tolerancia al ejercicio baja o nula</li>
            <li>Cambios de comportamiento</li>
            <li>Deprimido y / o retraído</li>
            <li>Pérdida de apetito</li>
            <li>Cambios de peso, especialmente pérdida de peso.</li>
          </ul>
        </div>

        <div className={styles.imageSection}>
          <img
            src="src/assets/images/EspecialidadesPage/Cardiologia/Cardiologia-Veterinaria.png"
            alt="Cardiología veterinaria"
            className={styles.image}
          />
        </div>
      </div>

      {/* Nueva sección de Procedimientos de diagnóstico */}
      <div className={styles.diagnosticSection}>
        <h2 className={styles.sectionTitle}>Procedimientos de diagnóstico</h2>
        <p className={styles.sectionIntro}>
          Dentro del procedimiento para diagnóstico de afecciones cardíacas y
          pulmonares, se utilizan con frecuencia las siguientes pruebas:
        </p>

        <div className={styles.diagnosticGrid}>
          <div className={styles.diagnosticCard}>
            <h3 className={styles.cardTitle}>Análisis completo de sangre</h3>
            <p className={styles.cardText}>
              La diversidad de parámetros que puede aportar un análisis de
              sangre, ayuda a definir causas cardíacas y extracardiacas del
              funcionamiento anormal del corazón, como pueden ser las anemias,
              deshidratación, desajuste de los electrolitos, alteraciones
              hormonales o serologías (enfermedades infecciosas).
            </p>
          </div>

          <div className={styles.diagnosticCard}>
            <h3 className={styles.cardTitle}>Electrocardiografía (ECG)</h3>
            <p className={styles.cardText}>
              Las informaciones sobre la formación y conducción del impulso
              eléctrico cardíaco permiten el análisis del ritmo cardíaco aportar
              datos que pueden sugerir problemas en el corazón. La utilizamos
              con mucha frecuencia en la rutina de la clínica, sobre todo en los
              procedimientos preanestésicos y en situaciones en las que el
              paciente aparenta ser asintomático.
            </p>
          </div>

          <div className={styles.diagnosticCard}>
            <h3 className={styles.cardTitle}>Ecocardiografía</h3>
            <p className={styles.cardText}>
              Es la técnica más importante de la cardiología, aunque no
              sustituye a las anteriores. Permite el estudio dinámico y estático
              del funcionamiento cardíaco, donde podemos evaluar la integridad
              de sus estructuras (paredes, cavidades, válvulas, etc.), así como
              las variaciones de los grandes vasos. El análisis del flujo
              sanguíneo (velocidad, presión y forma) a través del sistema
              Doppler es imprescindible en un estudio completo de la función
              cardíaca.
            </p>
          </div>
        </div>
      </div>

      {/* Sección de reserva y cardiopatías */}
      <div className={styles.bookingSection}>
        <div className={styles.bookingCard}>
          <h2 className={styles.bookingTitle}>
            Reserva tu hora de consulta en Cardiología
          </h2>
          <button className={styles.bookingButton}>Reservar ahora</button>
        </div>

        <div className={styles.diseasesSection}>
          <h2 className={styles.diseasesTitle}>Cardiopatías más frecuentes</h2>

          <div className={styles.diseasesGrid}>
            <div className={styles.diseaseType}>
              <h3 className={styles.typeTitle}>Congénitas</h3>
              <ul className={styles.diseaseList}>
                <li>Estenosis pulmonar</li>
                <li>Defecto del septo interventricular</li>
                <li>Conducto arterioso persistente</li>
                <li>Estenosis subaórtica</li>
                <li>Displasia de la válvula atrioventricular</li>
              </ul>
            </div>

            <div className={styles.diseaseType}>
              <h3 className={styles.typeTitle}>Adquiridas</h3>
              <ul className={styles.diseaseList}>
                <li>Enfermedad degenerativa de la válvula mitral</li>
                <li>Cardiomiopatía arritmogénica</li>
                <li>Cardiomiopatía dilatada</li>
                <li>Cardiomiopatía hipertrófica</li>
                <li>Neoplasias y enfermedades del pericardio</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardiologia;
