import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../../feactures/tracking/SearchForm/components/SearchForm';
import backgroundImage2 from "../../img/fondo_3.1.jpeg";


const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSearch = (trackingNumber) => {
        // Lógica para manejar la búsqueda del número de seguimiento
        console.log("Número de seguimiento buscado:", trackingNumber);
        // Aquí podrías navegar a una página de resultados de búsqueda, por ejemplo:
        // navigate(`/tracking/${trackingNumber}`);
    };

    return (
        <Container fluid   className="bg-gray-200 min-vh-75 d-flex align-items-center justify-content-center contenedor-login "
        style={{
          backgroundImage: `url(${backgroundImage2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
        }}>
            <Row className="justify-content-end mt-3 me-3">
                <Col xs="auto">
                    <Button variant="outline-primary" onClick={handleLoginClick}>Login</Button>
                </Col>
            </Row>
            <Row className="flex-grow-1 justify-content-center align-items-center">
                <Col md={8}>
                <div className="bg-light p-5 rounded text-center"> {/* Reemplaza Jumbotron con un div */}
                        <h1>Bienvenido al Sistema de Tracking de Despachos</h1>
                        <p>Ingrese su número de seguimiento para conocer el estado de su envío.</p>
                        <SearchForm onSubmit={handleSearch} />
                    </div>
                </Col>
            </Row>
          
        </Container>
    );
};

export default HomePage;