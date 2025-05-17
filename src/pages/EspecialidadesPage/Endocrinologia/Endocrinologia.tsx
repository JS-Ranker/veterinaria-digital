import styles from "./Endocrinologia.module.css";

const Endocrinologia = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ENDOCRINOLOGÍA VETERINARIA</h1>

      <div className={styles.content}>
        <div className={styles.textSection}>
          <p className={styles.intro}>
            La endocrinología veterinaria es una rama de la medicina interna que
            se focaliza en el diagnóstico y tratamiento de todas las
            alteraciones hormonales y metabólicas. El correcto funcionamiento
            del sistema endocrino es fundamental para preservar el bienestar del
            organismo ya que regula todo el metabolismo además de ser
            indispensable para el crecimiento, el estado de ánimo, el pelaje y
            varias otras variables de comportamiento.
          </p>

          <p className={styles.description}>
            Las enfermedades hormonales hoy en día tienen una alta prevalencia
            en los pequeños animales y al momento de no ser tratadas pueden
            generar múltiples descompensaciones. Pueden ocurrir por un exceso de
            ciertas hormonas, como el síndrome de Cushing, el hipertiroidismo,
            el hipersomatotropismo o por la falta de estas, como el
            hipotiroidismo, la diabetes mellitus o el síndrome de Addison.
            Gracias a un correcto tratamiento estas condiciones pueden ser
            controladas con éxito mejorando la calidad de vida y aumentando el
            pronóstico de vida de los individuos afectados.
          </p>
        </div>

        <div className={styles.imageSection}>
          <img
            src="src\assets\images\EspecialidadesPage\Endocrinologia\enfermedades-hormonales.jpg"
            alt="Endocrinología veterinaria"
            className={styles.image}
          />
        </div>
      </div>

      {/* Sección de Hipotiroidismo */}
      <div className={styles.diseaseSection}>
        <h2 className={styles.sectionTitle}>Hipotiroidismo</h2>
        <div className={styles.diseaseContent}>
          <div className={styles.diseaseText}>
            <p>
              El hipotiroidismo es la enfermedad endocrina más frecuente en los
              pacientes caninos y presenta una alta prevalencia en nuestro país.
              Se caracteriza por una disminución en la producción de las
              hormonas tiroideas dada por una alteración propia de la glándula
              tiroides que en la mayoría de los casos es secundaria a una
              tiroiditis linfocítica de origen inmunomediado.
            </p>
            <p>
              La pérdida de funcionalidad de la glándula genera una baja
              importante en la tasa metabólica, esto tiene múltiples efectos a
              nivel sistémico y puede generar:
            </p>
            <ul className={styles.symptomsList}>
              <li>Aumento de peso</li>
              <li>Hiporexia (disminución del apetito)</li>
              <li>Alteraciones dermatológicas</li>
              <li>Alteraciones en el sistema inmune</li>
              <li>Dislipemias (alteraciones en lípidos sanguíneos)</li>
              <li>Cambios en el comportamiento</li>
              <li>Letargia y disminución de la actividad</li>
              <li>Intolerancia al frío</li>
            </ul>
          </div>
          <div className={styles.diseaseImage}>
            <img
              src="src\assets\images\EspecialidadesPage\Endocrinologia\endocrinologia-Veterinaria-hipotiroidismo.jpg"
              alt="Hipotiroidismo en mascotas"
              className={styles.image}
            />
          </div>
        </div>
      </div>

      {/* Sección de otras enfermedades endocrinas */}
      <div className={styles.otherDiseases}>
        <h2 className={styles.sectionTitle}>Otras Enfermedades Endocrinas</h2>

        <div className={styles.diseaseCards}>
          <div className={styles.diseaseCard}>
            <h3>Síndrome de Cushing</h3>
            <p>
              Exceso de producción de cortisol que puede causar aumento de sed y
              orina, jadeo excesivo, abdomen péndulo y problemas cutáneos.
            </p>
          </div>

          <div className={styles.diseaseCard}>
            <h3>Diabetes Mellitus</h3>
            <p>
              Deficiencia de insulina que proviene aumento de glucosa en sangre,
              con síntomas como poliuria, polidipsia y pérdida de peso.
            </p>
          </div>

          <div className={styles.diseaseCard}>
            <h3>Síndrome de Addison</h3>
            <p>
              Deficiencia de hormonas adrenales que puede causar vómitos,
              diarrea, debilidad y deshidratación severa.
            </p>
          </div>

          <div className={styles.diseaseCard}>
            <h3>Hipertiroidismo</h3>
            <p>
              Común en gatos mayores, causa pérdida de peso a pesar de aumento
              de apetito, hiperactividad y taquicardia.
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
              <li>Perfiles hormonales completos</li>
              <li>Pruebas de estimulación/supresión</li>
              <li>Análisis de sangre y orina</li>
              <li>Ultrasonido endocrino</li>
              <li>Pruebas genéticas en razas predispuestas</li>
            </ul>
          </div>
          <div className={styles.treatmentMethods}>
            <h3>Opciones de Tratamiento</h3>
            <ul>
              <li>Terapia de reemplazo hormonal</li>
              <li>Medicación para regular producción hormonal</li>
              <li>Dietas especializadas</li>
              <li>Control de enfermedades concurrentes</li>
              <li>Seguimiento periódico y ajuste de dosis</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Llamado a la acción */}
      <div className={styles.ctaSection}>
        <h2>¿Sospechas que tu mascota tiene un problema endocrino?</h2>
        <p>
          Nuestros especialistas están listos para ayudarte con diagnóstico
          preciso y tratamiento personalizado.
        </p>
        <button className={styles.ctaButton}>Reservar Consulta</button>
      </div>
    </div>
  );
};

export default Endocrinologia;
