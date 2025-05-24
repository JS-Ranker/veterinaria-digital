import styles from "./Oncologia.module.css";

const Oncologia = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ONCOLOGÍA VETERINARIA</h1>

      <div className={styles.content}>
        <div className={styles.textSection}>
          <p className={styles.intro}>
            La oncología veterinaria es una especialidad médica dedicada al
            diagnóstico, tratamiento y manejo del cáncer en animales. El cáncer
            es una de las principales causas de muerte en mascotas adultas y
            geriátricas, pero con un diagnóstico temprano y un tratamiento
            adecuado, muchos pacientes pueden lograr una buena calidad de vida y
            prolongar su supervivencia significativamente.
          </p>

          <p className={styles.description}>
            Los tumores pueden ser benignos o malignos (cancerosos), y su
            comportamiento varía según el tipo, ubicación y etapa. Algunos
            cánceres comunes en mascotas incluyen linfoma, mastocitoma,
            osteosarcoma y carcinoma de células escamosas. La oncología
            veterinaria moderna ofrece diversas opciones terapéuticas como
            cirugía, quimioterapia, radioterapia e inmunoterapia, adaptadas a
            cada caso particular para maximizar los resultados.
          </p>
        </div>

        <div className={styles.imageSection}>
          <img
            src="src/assets/images/EspecialidadesPage/Oncologia/oncologia1.webp"
            alt="Oncología veterinaria"
            className={styles.image}
          />
        </div>
      </div>

      {/* Sección de Linfoma */}
      <div className={styles.diseaseSection}>
        <h2 className={styles.sectionTitle}>Linfoma</h2>
        <div className={styles.diseaseContent}>
          <div className={styles.diseaseText}>
            <p>
              El linfoma es uno de los cánceres más frecuentes en perros y
              gatos, afectando principalmente el sistema linfático. Es un cáncer
              de los linfocitos (células inmunitarias) que puede presentarse en
              múltiples formas, incluyendo linfoma multicéntrico, alimentario,
              mediastínico y extranodal.
            </p>
            <p>
              Los síntomas varían según el tipo de linfoma, pero pueden incluir:
            </p>
            <ul className={styles.symptomsList}>
              <li>Agrandamiento de ganglios linfáticos</li>
              <li>Pérdida de peso y apetito</li>
              <li>Letargia y debilidad</li>
              <li>Vómitos y diarrea (en linfoma alimentario)</li>
              <li>Dificultad respiratoria (en linfoma mediastínico)</li>
              <li>Aumento de sed y orina (en algunos casos)</li>
            </ul>
          </div>
          <div className={styles.diseaseImage}>
            <img
              src="src/assets/images/EspecialidadesPage/Oncologia/linfoma.webp"
              alt="Linfoma en mascotas"
              className={styles.image}
            />
          </div>
        </div>
      </div>

      {/* Sección de otros tipos de cáncer */}
      <div className={styles.otherDiseases}>
        <h2 className={styles.sectionTitle}>Otros Tipos de Cáncer</h2>

        <div className={styles.diseaseCards}>
          <div className={styles.diseaseCard}>
            <h3>Mastocitoma</h3>
            <p>
              Tumor de células cebadas común en perros, especialmente en razas
              como Boxer y Bulldog. Puede variar desde benigno hasta altamente
              agresivo.
            </p>
          </div>

          <div className={styles.diseaseCard}>
            <h3>Osteosarcoma</h3>
            <p>
              Cáncer óseo agresivo que afecta principalmente a razas grandes y
              gigantes. Suele presentarse en las extremidades con dolor y cojera
              progresiva.
            </p>
          </div>

          <div className={styles.diseaseCard}>
            <h3>Carcinoma de células escamosas</h3>
            <p>
              Cáncer de piel común en gatos de pelo blanco (orejas y nariz) y
              perros. Relacionado con exposición solar y puede ser localmente
              invasivo.
            </p>
          </div>

          <div className={styles.diseaseCard}>
            <h3>Hemangiosarcoma</h3>
            <p>
              Cáncer vascular agresivo que afecta frecuentemente el bazo,
              corazón e hígado. Puede causar hemorragias internas repentinas.
            </p>
          </div>
        </div>
      </div>

      {/* Sección de diagnóstico y tratamiento */}
      <div className={styles.diagnosticSection}>
        <h2 className={styles.sectionTitle}>Diagnóstico y Tratamiento</h2>
        <div className={styles.diagnosticContent}>
          <div className={styles.diagnosticMethods}>
            <h3>Métodos de Diagnóstico</h3>
            <ul>
              <li>Biopsia y análisis histopatológico</li>
              <li>Citología por aspiración con aguja fina</li>
              <li>Radiografías y ecografías</li>
              <li>Tomografía computarizada (TC) y resonancia magnética (RM)</li>
              <li>Análisis de sangre y marcadores tumorales</li>
            </ul>
          </div>
          <div className={styles.treatmentMethods}>
            <h3>Opciones de Tratamiento</h3>
            <ul>
              <li>Cirugía oncológica (resección tumoral)</li>
              <li>Quimioterapia convencional y metronómica</li>
              <li>Radioterapia (cuando está disponible)</li>
              <li>Inmunoterapia y terapias dirigidas</li>
              <li>Cuidados paliativos y manejo del dolor</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Llamado a la acción */}
      <div className={styles.ctaSection}>
        <h2>¿Sospechas que tu mascota podría tener cáncer?</h2>
        <p>
          Nuestros oncólogos veterinarios están disponibles para evaluar a tu
          mascota y ofrecer las mejores opciones de diagnóstico y tratamiento.
        </p>
        <button className={styles.ctaButton}>Reservar Consulta</button>
      </div>
    </div>
  );
};

export default Oncologia;
