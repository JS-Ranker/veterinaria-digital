import { FaPaw, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import styles from "./footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWave}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.waveFill}></path>
        </svg>
      </div>
      
      <div className={styles.footerContent}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Columna 1: Logo y descripción */}
            <div className={styles.footerColumn}>
              <div className={styles.footerLogo}>
                <FaPaw className={styles.logoIcon} />
                <span>Happy Pet</span>
              </div>
              <p className={styles.footerDesc}>
                Cuidando con amor a tus mascotas desde 2010. En Happy Pet nos dedicamos a ofrecer los mejores servicios veterinarios con profesionalismo y cariño.
              </p>
            </div>
            
            {/* Columna 2: Enlaces rápidos */}
            <div className={styles.footerColumn}>
              <h3 className={styles.footerHeading}>Enlaces Rápidos</h3>
              <ul className={styles.footerLinks}>
                <li><a href="/" className={styles.footerLink}>Inicio</a></li>
                <li><a href="/servicios" className={styles.footerLink}>Servicios</a></li>
                <li><a href="/nosotros" className={styles.footerLink}>Sobre Nosotros</a></li>
                <li><a href="/contacto" className={styles.footerLink}>Contacto</a></li>
                <li><a href="/citas" className={styles.footerLink}>Reservar Cita</a></li>
              </ul>
            </div>
            
            {/* Columna 3: Contacto */}
            <div className={styles.footerColumn}>
              <h3 className={styles.footerHeading}>Contacto</h3>
              <ul className={styles.footerContact}>
                <li className={styles.contactItem}>
                  <FaPhone className={styles.contactIcon} />
                  <span>(123) 456-7890</span>
                </li>
                <li className={styles.contactItem}>
                  <FaEnvelope className={styles.contactIcon} />
                  <span>info@happypet.com</span>
                </li>
                <li className={styles.contactItem}>
                  <FaMapMarkerAlt className={styles.contactIcon} />
                  <span>Av. Mascotas 123, Ciudad</span>
                </li>
              </ul>
              
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialIcon} aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="#" className={styles.socialIcon} aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className={styles.socialIcon} aria-label="Twitter">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
          
          <div className={styles.footerBottomBar}>
            <p className={styles.copyright}>
              © {currentYear} Happy Pet - Todos los derechos reservados
            </p>
            <div className={styles.footerBottomLinks}>
              <a href="/privacidad" className={styles.bottomLink}>Privacidad</a>
              <a href="/terminos" className={styles.bottomLink}>Términos</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;