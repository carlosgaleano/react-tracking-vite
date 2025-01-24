
import { Container, Row, Col } from 'react-bootstrap';
import { FiTruck } from "react-icons/fi";
import { FaLaptopCode } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Obtiene el año actual

  return (
    <footer className="bg-dark text-white-50 py-3 mt-auto ">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-md-start text-center">
            <p className="mb-0">&copy; {currentYear} Logytech. Derechos Reservados <b>Logytech Chile</b>. <FiTruck /></p> {/* Usa la variable currentYear */}
          </Col>
          <Col md={6} className="text-md-end text-center">
            <p className="mb-0"> <FaLaptopCode /> Desarrollado por <b>Logytech Chile.</b> </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;