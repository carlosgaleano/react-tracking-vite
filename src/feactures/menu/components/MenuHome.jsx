import  { useState } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa';
import DataDespachos from "../../tracking/components/Despachos";
import DashboardDespachos from '../../Dashboard/components/DashboardDespachos';
import Sidebar from './Sidebar';
import Tooltip from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";


// Componente hijo para el contenido principal
const MainContent = ({ activeMenuItem }) => {
    switch (activeMenuItem) {
        case 'Despachos':
            return <DataDespachos />;
        case 'Indicadores':
                return <DashboardDespachos />;    
        case 'User Profile':
            return <p>Contenido del Perfil de Usuario</p>;
        case 'Table List':
            return <p>Contenido de la Lista de Tablas</p>;
        default:
            return (
                <> 
                    <DashboardDespachos />
                </>
               
            );
    }
};

const MenuHome = () => {
    const [showMenu, setShowMenu] = useState(true);
    const [activeMenuItem, setActiveMenuItem] = useState(null);

    const handleMenuItemClick = (item) => {
        setActiveMenuItem(item);
        setShowMenu(false);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const tooltipText = showMenu ? "Cerrar menú" : "Abrir menú";

    return (
        <Container fluid className="mt-4  contenedor">
            <Row>
                <Col xs="auto" className="mb-3">
                <OverlayTrigger
          offset={[0, 0]}
          className="bg-dark text-white w-25"
          overlay={<Tooltip  className="bg-dark text-white mb-2" id="tooltip-disabled">{tooltipText}!</Tooltip>}
        >
                    <button className="btn btn-primary" onClick={toggleMenu} aria-label={showMenu ? 'Cerrar menú' : 'Abrir menú'}>
                       {showMenu ? <FaTimes /> : <FaBars />}
                    </button>
                    </OverlayTrigger>
                </Col>
                <Col md={showMenu ? 0 : 1}></Col>

                <Col xs={12} md={showMenu ? 3 : 0} className={`sidebar ${showMenu ? 'show' : 'hide'} d-md-block d-none`}>
                    <Sidebar activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} toggleMenu={toggleMenu} setShowMenu={setShowMenu}   showMenu={showMenu} tooltipText={tooltipText} />
                </Col>

                {/* Usamos el componente MainContent y le pasamos activeMenuItem como prop */}
                <Col xs={12} md={showMenu ? 9 : 11}>
                    <MainContent activeMenuItem={activeMenuItem} />
                </Col>
            </Row>
        </Container>
    );
};

export default MenuHome;