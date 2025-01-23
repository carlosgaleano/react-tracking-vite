import  {  useState, useEffect } from "react";
import backgroundImage2 from "../../img/fondo_3.1.jpeg";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../../feactures/auth/helpers/Auth.js";
import { useAuthStore } from "../../feactures/auth/store/auth.ts";
import AlertLogin from "../../feactures/auth/components/AlertLogin";

const LoginPage = () => {
  const setToken = useAuthStore((state) => state.setToken);
  //const setProfile = useAuthStore((state) => state.setProfile);
  const [alertShow, setAlertShow] = useState(false);
  const navegate = useNavigate();
  const handleSubmit = async () => {
    console.log(email);
    try {
      const response = await LoginRequest(email, password);
      if (response?.data && response?.data.access_token) {
        const { access_token } = response.data;
        console.log(access_token);
        setToken(access_token);
        /* const {data:{data:{attributes:dataProfile}}}=await ProfileRequest();
      console.log('data profiles',dataProfile);
      setProfile(dataProfile);*/
        navegate("/blog");
      } else {
        // Handle the case where 'data' or 'access_token' is missing
        //console.error("Access token not found in response.");
        setAlertShow(true);
        // Display an error message to the user
      }
    } catch (error) {
      // Handle other potential errors (e.g., network errors)
      console.error("Error during login:", error);
      // Display an appropriate error message to the user
    }
  };

  const { formState, onInputChange, onResetForm, email, password } = useForm({
    email: "cags20031@gmail.com",
    password: "api2024",
  });
  useEffect(() => {
    if (alertShow) {
      const timeoutId = setTimeout(() => {
        setAlertShow(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [alertShow]);

  return (
    <>
      <Container
        fluid
        className="bg-gray-200 min-vh-75 d-flex align-items-center justify-content-center contenedor-login "
        style={{
          backgroundImage: `url(${backgroundImage2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
        }}
      >
        <Row className="w-100">
          <Col xs={12} md={8} lg={4} className="mx-auto transparent-card-body ">
            <Card className="z-index-0 fadeIn3 fadeInBottom transparent-card-body cardAcceso border-white-shadow">
              <Card.Header className="p-0 position-relative bg-gradient-dark border-radius-lg">
                <div className="py-3 text-center">
                  <h4 className="text-white font-weight-bolder color-white ">
                    Acceso al Sistema
                  </h4>
                  <div className="d-flex justify-content-center mt-3">
                    <Button variant="link" className="text-white me-2">
                      <i className="fa fa-facebook text-lg"></i>
                    </Button>
                    <Button variant="link" className="text-white me-2">
                      <i className="fa fa-github text-lg"></i>
                    </Button>
                    <Button variant="link" className="text-white">
                      <i className="fa fa-google text-lg"></i>
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body className="transparent-card-body">
                <Form onSubmit={handleSubmit}>
                  <Form.Group
                    className="mb-3 color-white"
                    controlId="formEmail"
                  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      className="inputColor"
                      value={email}
                      onChange={onInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 color-white"
                    controlId="formPassword"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      className="inputColor"
                      value={password}
                      onChange={onInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 text-white">
                    <Form.Check
                      type="checkbox"
                      label="Recordar credenciales"
                      defaultChecked
                    />
                  </Form.Group>
                  <Button
                    variant="dark"
                    className="w-100 color-white"
                    onClick={handleSubmit}
                  >
                    Ingresar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          {alertShow && (
            <AlertLogin setAlertShow={setAlertShow} alertShow={alertShow} />
          )}
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
