import { FaPaw } from "react-icons/fa";
import CarouselBanner from "../components/CarouselBanner";

const Home = () => {
  return (
    <>
      <CarouselBanner />
      <div className="container sobre-nosotros">
        <h1 className="text-center">
          <FaPaw /> HAPPY PET
        </h1>
        <div className="container" style={{ padding: "50px" }}>
          <p className="h3">
            Somos la veterinaria Happy Pet, tu aliado en el cuidado y bienestar
            de tus mascotas. Con amor, experiencia y un equipo dedicado, nos
            comprometemos a brindar la mejor atención médica, preventiva y de
            emergencia para que tus peludos vivan una vida feliz y saludable.
            Pero nuestro compromiso va más allá: como parte de nuestra labor
            social, trabajamos como ONG para rescatar animales en situación de
            calle, rehabilitarlos y darles visibilidad en busca de un hogar
            lleno de amor. Porque en Happy Pet, cada pata cuenta y cada adopción
            es una nueva familia.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
