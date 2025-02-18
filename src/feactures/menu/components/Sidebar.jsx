import {
  Card,
  ListGroup,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import { RiPictureInPictureExitLine } from "react-icons/ri";
import { LogOut2 } from "./LogOut";
import { FiTruck } from "react-icons/fi";
import { FaRegChartBar } from "react-icons/fa";


const Sidebar = ({
  activeMenuItem,
  handleMenuItemClick,
  toggleMenu,
  setShowMenu,
  showMenu,
  tooltipText,
}) => {
  const renderTooltip = (props) => (
    <Tooltip id="menu-tooltip" {...props}>
      {tooltipText}
    </Tooltip>
  );

  return (
    <Card className="d-flex flex-column h-100 ">
      <Card.Body  className="d-flex flex-column ">  
        <Card.Title className=" color-white">
          Menu
          <OverlayTrigger
            placement="left"
            overlay={renderTooltip}
            offset={[10, -180]}
          >
            <Button
              variant="link"
              style={{
                padding: 0,
                border: "none",
                cursor: "pointer",
                margin: 0,
              }}
              onClick={toggleMenu}
            >
              <RiPictureInPictureExitLine className="desplazar" />
            </Button>
          </OverlayTrigger>
        </Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item
            className="menuItem"
            active={activeMenuItem === "Indicadores"}
            onClick={() => handleMenuItemClick("Indicadores")}
            action
          >
            Indicadores {"  "} <FaRegChartBar />
          </ListGroup.Item>

          <ListGroup.Item
            className="menuItem"
            active={activeMenuItem === "Despachos"}
            onClick={() => handleMenuItemClick("Despachos")}
            action
          >
            Despachos {"  "} <FiTruck />
          </ListGroup.Item>
          
          {/* ... otros items del menu */}
        </ListGroup>
      </Card.Body>
      <div className="ml-5"> {/* Contenedor para el botón de cerrar sesión */}
         
             
              <LogOut2 />
        
        </div>
    </Card>
  );
};

export default Sidebar;
