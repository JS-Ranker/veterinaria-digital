import styles from "./Gastroenterologia.module.css";

const Gastroenterologia = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GASTROENTEROLOGÍA VETERINARIA</h1>

      <div className={styles.content}>
        <div className={styles.textSection}>
          <p className={styles.intro}>
            La gastroenterología veterinaria es la especialidad médica que se
            enfoca en el diagnóstico y tratamiento de las enfermedades del
            sistema digestivo en animales. Desde la boca hasta el colon, esta
            especialidad aborda problemas como vómitos, diarreas, enfermedades
            inflamatorias intestinales, obstrucciones y trastornos hepáticos o
            pancreáticos.
          </p>

          <p className={styles.description}>
            Los trastornos gastrointestinales son una de las causas más
            frecuentes de consulta veterinaria. Pueden ser agudos o crónicos, y
            su origen puede ser infeccioso, parasitario, alérgico, metabólico o
            neoplásico. Un diagnóstico preciso y un tratamiento temprano son
            fundamentales para prevenir complicaciones y garantizar la
            recuperación de la salud digestiva de nuestras mascotas.
          </p>
        </div>

        <div className={styles.imageSection}>
          <img
            src="src/assets/images/EspecialidadesPage/Gastroenterologia/gastroenterologia.jpg"
            alt="Gastroenterología veterinaria"
            className={styles.image}
          />
        </div>
      </div>

      {/* Sección de Enfermedad Inflamatoria Intestinal */}
      <div className={styles.diseaseSection}>
        <h2 className={styles.sectionTitle}>
          Enfermedad Inflamatoria Intestinal (EII)
        </h2>
        <div className={styles.diseaseContent}>
          <div className={styles.diseaseText}>
            <p>
              La EII es un trastorno crónico caracterizado por la infiltración
              de células inflamatorias en la pared del tracto gastrointestinal.
              Es una de las causas más comunes de problemas digestivos crónicos
              en perros y gatos, especialmente en razas predispuestas como el
              Pastor Alemán, Boxer o el Gato Siames.
            </p>
            <p>Los síntomas pueden incluir:</p>
            <ul className={styles.symptomsList}>
              <li>Diarrea crónica (intermitente o persistente)</li>
              <li>Vómitos recurrentes</li>
              <li>Pérdida de peso progresiva</li>
              <li>Disminución del apetito</li>
              <li>Heces con moco o sangre</li>
              <li>Dolor abdominal</li>
              <li>Letargia</li>
            </ul>
          </div>
          <div className={styles.diseaseImage}>
            <img
              src="src/assets/images/EspecialidadesPage/Gastroenterologia/eii.jpg"
              alt="Enfermedad inflamatoria intestinal en mascotas"
              className={styles.image}
            />
          </div>
        </div>
      </div>

      {/* Sección de otras enfermedades gastrointestinales */}
      <div className={styles.otherDiseases}>
        <h2 className={styles.sectionTitle}>
          Otras Enfermedades Gastrointestinales
        </h2>

        <div className={styles.diseaseCards}>
          <div className={styles.diseaseCard}>
            <h3>Pancreatitis</h3>
            <p>
              Inflamación del páncreas que puede ser aguda o crónica. Causa
              dolor abdominal intenso, vómitos y deshidratación. Más común en
              perros pequeños con dietas altas en grasas.
            </p>
          </div>

          <div className={styles.diseaseCard}>
            <h3>Gastritis</h3>
            <p>
              Inflamación del estómago que provoca vómitos agudos. Puede ser
              causada por ingestión de cuerpos extraños, toxinas, infecciones o
              alergias alimentarias.
            </p>
          </div>

          <div className={styles.diseaseCard}>
            <h3>Enteritis Parasitaria</h3>
            <p>
              Infección por parásitos intestinales como giardias, coccidios o
              gusanos. Causa diarrea, pérdida de peso y en casos graves,
              desnutrición.
            </p>
          </div>

          <div className={styles.diseaseCard}>
            <h3>Obstrucción Intestinal</h3>
            <p>
              Bloqueo mecánico del intestino por cuerpos extraños, tumores o
              invaginaciones. Emergencia quirúrgica que causa vómitos, dolor y
              ausencia de defecación.
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
              <li>Análisis de sangre completos (hemograma, bioquímica)</li>
              <li>Ecografía abdominal</li>
              <li>Endoscopia con biopsias</li>
              <li>Radiografías simples y contrastadas</li>
              <li>Análisis coprológicos y pruebas parasitarias</li>
              <li>Pruebas específicas (TLI, folatos, cobalamina)</li>
            </ul>
          </div>
          <div className={styles.treatmentMethods}>
            <h3>Opciones de Tratamiento</h3>
            <ul>
              <li>
                Dietas especiales (hipoalergénicas, bajas en grasas, etc.)
              </li>
              <li>
                Terapia farmacológica (antiinflamatorios, inmunosupresores)
              </li>
              <li>Tratamiento antiparasitario específico</li>
              <li>Probióticos y prebióticos</li>
              <li>Cirugía en casos de obstrucción o neoplasias</li>
              <li>Fluidoterapia y soporte nutricional</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Llamado a la acción */}
      <div className={styles.ctaSection}>
        <h2>¿Tu mascota tiene problemas digestivos?</h2>
        <p>
          Nuestros especialistas en gastroenterología veterinaria pueden ayudar
          a diagnosticar y tratar los trastornos gastrointestinales de tu
          compañero peludo con las técnicas más avanzadas.
        </p>
        <button className={styles.ctaButton}>Reservar Consulta</button>
      </div>
    </div>
  );
};

export default Gastroenterologia;
