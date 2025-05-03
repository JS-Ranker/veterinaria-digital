import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CarouselBanner = () => {
  return (
    <Carousel
      fade
      id="bannerPrincipal"
      className="carousel slide carousel-fade"
    >
      <Carousel.Item interval={7000}>
        <img
          className="d-block w-100"
          src="/src/assets/imgs/gato01.jpg"
          alt="Andariel"
          style={{ height: "90vh", objectFit: "cover" }}
        />
        <Carousel.Caption className="d-none d-md-block overlay-carousel">
          <h5>Andariel</h5>
          <p>
            Tras ser rescatado, Andariel se ha recuperado completamente y vive
            feliz lamiéndose las patitas todos los días.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={7000}>
        <img
          className="d-block w-100"
          src="/src/assets/imgs/corgi-4415649_1280.jpg"
          alt="Luna"
          style={{ height: "90vh", objectFit: "cover" }}
        />
        <Carousel.Caption className="d-none d-md-block overlay-carousel">
          <h5>Luna</h5>
          <p>
            Desde que fue rescatada, Luna no ha dejado de mostrar alegría y una
            tremenda gratitud hacia su nueva familia.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={7000}>
        <img
          className="d-block w-100"
          src="/src/assets/imgs/dog-3344414_1280.jpg"
          alt="Lucy"
          style={{ height: "90vh", objectFit: "cover" }}
        />
        <Carousel.Caption className="d-none d-md-block overlay-carousel">
          <h5>Lucy</h5>
          <p>
            A pesar de su accidentado nacimiento, Lucy ha podido disfrutar de
            una bella familia donde cada día aprende más... ¡y come más!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselBanner;
