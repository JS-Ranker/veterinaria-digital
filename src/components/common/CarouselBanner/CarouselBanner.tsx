import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./CarouselBanner.module.css";

const CarouselBanner = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const totalSlides = 3;

  const handleSlideChange = (selectedIndex: number) => {
    setIsTransitioning(true);
    setActiveIndex(selectedIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Efecto de animación para los indicadores personalizados
  useEffect(() => {
    const interval = !isHovered
      ? setInterval(() => {
          const nextIndex = (activeIndex + 1) % totalSlides;
          setActiveIndex(nextIndex);
        }, 7000)
      : null;

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeIndex, isHovered]);

  return (
    <div
      className={`${styles.carouselWrapper} ${
        isTransitioning ? styles.transitioning : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel
        fade
        id="bannerPrincipal"
        className={styles.carousel}
        indicators={false}
        activeIndex={activeIndex}
        onSelect={handleSlideChange}
        controls={false}
      >
        {/* Slide 1: Veterinaria */}
        <Carousel.Item>
          <div className={styles.imageContainer}>
            <img
              className="d-block w-100"
              src="/src/assets/images/veterinaria.jpg"
              alt="Servicios Veterinarios"
            />
          </div>
        </Carousel.Item>

        {/* Slide 2: Ecommerce */}
        <Carousel.Item>
          <div className={styles.imageContainer}>
            <img
              className="d-block w-100"
              src="/src/assets/images/ecommerce.jpg"
              alt="Tienda Online"
            />
          </div>
        </Carousel.Item>

        {/* Slide 3: Adopciones */}
        <Carousel.Item>
          <div className={styles.imageContainer}>
            <img
              className="d-block w-100"
              src="/src/assets/images/adopcion.jpg"
              alt="Adopciones"
            />
          </div>
        </Carousel.Item>
      </Carousel>

      {/* Control arrows personalizados */}
      <div className={styles.customControls}>
        <button
          className={styles.controlPrev}
          onClick={() =>
            handleSlideChange((activeIndex - 1 + totalSlides) % totalSlides)
          }
        >
          <span>‹</span>
        </button>
        <button
          className={styles.controlNext}
          onClick={() => handleSlideChange((activeIndex + 1) % totalSlides)}
        >
          <span>›</span>
        </button>
      </div>

      {/* Indicadores personalizados */}
      <div className={styles.customIndicators}>
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              activeIndex === index ? styles.active : ""
            }`}
            onClick={() => handleSlideChange(index)}
          />
        ))}
      </div>

      {/* Mensaje principal basado en el slide activo */}
      <div className={styles.mainMessageOverlay}>
        {activeIndex === 0 && (
          <div
            className={`${styles.mainMessageContent} ${styles.veterinariaMessage}`}
          >
            <h1>Cuidamos a quien más quieres</h1>
            <p>
              Atención médica veterinaria de calidad con un equipo profesional
            </p>
            <button className={styles.mainActionButton}>
              Ver servicios veterinarios
            </button>
          </div>
        )}

        {activeIndex === 1 && (
          <div
            className={`${styles.mainMessageContent} ${styles.ecommerceMessage}`}
          >
            <h1>Todo para tu mascota en un solo lugar</h1>
            <p>Productos de calidad con entrega rápida a domicilio</p>
            <button className={styles.mainActionButton}>
              Visitar nuestra tienda
            </button>
          </div>
        )}

        {activeIndex === 2 && (
          <div
            className={`${styles.mainMessageContent} ${styles.adopcionMessage}`}
          >
            <h1>Adopta una vida, cambia dos destinos</h1>
            <p>
              En Happy Pet trabajamos para dar un nuevo hogar a mascotas
              rescatadas
            </p>
            <button className={styles.mainActionButton}>
              Conoce nuestras mascotas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarouselBanner;
