import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaPaw, FaChevronDown } from "react-icons/fa";
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsSpecialtiesOpen(false);
  };

  const toggleSpecialties = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpecialtiesOpen(!isSpecialtiesOpen);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.container}>
        <div className={styles.navWrapper}>
          <NavLink to="/" className={styles.brand} onClick={closeMenu}>
            <FaPaw className={styles.logo} /> Happy Pet
          </NavLink>

          <button
            className={styles.hamburger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className={styles.hamburgerIcon}></span>
          </button>

          <div
            className={`${styles.navMenu} ${isMenuOpen ? styles.showMenu : ""}`}
          >
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.activeNavLink}`
                      : styles.navLink
                  }
                  to="/"
                  end
                  onClick={closeMenu}
                >
                  Inicio
                </NavLink>
              </li>

              <li className={`${styles.navItem} ${styles.specialtiesItem}`}>
                <button
                  className={`${styles.navLink} ${
                    isSpecialtiesOpen ? styles.activeNavLink : ""
                  }`}
                  onClick={toggleSpecialties}
                >
                  Especialidades <FaChevronDown className={styles.chevron} />
                </button>
                {isSpecialtiesOpen && (
                  <ul className={styles.subMenu}>
                    <li>
                      <NavLink
                        to="/cardiologia"
                        className={styles.subNavLink}
                        onClick={closeMenu}
                      >
                        Cardiología
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/endocrinologia"
                        className={styles.subNavLink}
                        onClick={closeMenu}
                      >
                        Endocrinología
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/oncologia"
                        className={styles.subNavLink}
                        onClick={closeMenu}
                      >
                        Oncología
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/gastroenterologia"
                        className={styles.subNavLink}
                        onClick={closeMenu}
                      >
                        Gastroenterología
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              <li className={styles.navItem}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.activeNavLink}`
                      : styles.navLink
                  }
                  to="/login"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.activeNavLink}`
                      : styles.navLink
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
