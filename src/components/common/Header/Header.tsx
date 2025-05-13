import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
import styles from "./header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efecto para detectar el scroll y aplicar clases adicionales
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Agregar event listener para el scroll
    window.addEventListener('scroll', handleScroll);

    // Cleanup del event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Cerrar el menú al hacer clic en un enlace (para móviles)
  const closeMenu = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.container}>
        <div className={styles.navWrapper}>
          {/* Logo y nombre */}
          <NavLink to="/" className={styles.brand} onClick={closeMenu}>
            <FaPaw className={styles.logo} /> Happy Pet
          </NavLink>

          {/* Botón hamburguesa para móvil */}
          <button
            className={styles.hamburger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className={styles.hamburgerIcon}></span>
          </button>

          {/* Menú de navegación */}
          <div className={`${styles.navMenu} ${isMenuOpen ? styles.showMenu : ""}`}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink 
                  className={({isActive}) => 
                    isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
                  }
                  to="/" 
                  end
                  onClick={closeMenu}
                >
                  Inicio
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink 
                  className={({isActive}) => 
                    isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
                  }
                  to="/login"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink 
                  className={({isActive}) => 
                    isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
                  }
                  to="/register"
                  onClick={closeMenu}
                >
                  Registro
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;