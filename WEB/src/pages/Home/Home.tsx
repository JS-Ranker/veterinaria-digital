import { FaPaw } from "react-icons/fa";
import CarouselBanner from "../../components/common/CarouselBanner/CarouselBanner";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <CarouselBanner />
      
      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <FaPaw className={styles.pawIcon} /> HAPPY PET
          </h1>
          
          <div className={styles.contentBox}>
            <p className={styles.description}>
              Somos la veterinaria Happy Pet, tu aliado en el cuidado y bienestar
              de tus mascotas. Con amor, experiencia y un equipo dedicado, nos
              comprometemos a brindar la mejor atención médica, preventiva y de
              emergencia para que tus peludos vivan una vida feliz y saludable.
            </p>
            
            <p className={styles.description}>
              Pero nuestro compromiso va más allá: como parte de nuestra labor
              social, trabajamos como ONG para rescatar animales en situación de
              calle, rehabilitarlos y darles visibilidad en busca de un hogar
              lleno de amor. Porque en Happy Pet, cada pata cuenta y cada adopción
              es una nueva familia.
            </p>
          </div>
        </div>
      </section>
      
      <section className={styles.servicesPreview}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nuestros Servicios</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🏥</div>
              <h3>Atención Médica</h3>
              <p>Cuidado completo para tu mascota con profesionales experimentados</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>💉</div>
              <h3>Vacunación</h3>
              <p>Mantén a tu mascota protegida con nuestro plan de vacunación</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🐾</div>
              <h3>Adopciones</h3>
              <p>Conoce a nuestros peludos en busca de un hogar lleno de amor</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;