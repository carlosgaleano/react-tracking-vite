import { Card, Row, Col } from "react-bootstrap";
import { FaDatabase, FaUsers, FaEnvelope, FaCheckSquare } from "react-icons/fa";
    


const DashboardDespachos = () => {  
    return (
      
           
                        <Row>
                          <Col md={3}>
                            <Card bg="warning" text="white" className="mb-3">
                              <Card.Body>
                                <Card.Title><FaDatabase /> 49/50 GB</Card.Title>
                                <Card.Text>Used Space</Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col md={3}>
                            <Card bg="success" text="white" className="mb-3">
                              <Card.Body>
                                <Card.Title><FaUsers /> $34,245</Card.Title>
                                <Card.Text>Revenue</Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col md={3}>
                            <Card bg="danger" text="white" className="mb-3">
                              <Card.Body>
                                <Card.Title><FaEnvelope /> 75</Card.Title>
                                <Card.Text>Email Subscriptions</Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col md={3}>
                            <Card bg="info" text="white" className="mb-3">
                              <Card.Body>
                                <Card.Title><FaCheckSquare /> +245</Card.Title>
                                <Card.Text>Completed Tasks</Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                    ); // Contenido por defecto (el dashboard original)
      
}

export default DashboardDespachos;