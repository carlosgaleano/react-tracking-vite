import { useEffect } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import {useState} from 'react';
import {useEffectDespachos} from '../hooks/useFetchDespachos';


const FiltroDespachos = ({setData, setPending},pending) => {

  const [idConsulta,setIdConsulta] =useState("");
  const [idSelect,setIdSelect]=useState("");
  const [page, setPage] = useState(1);
  const [triggerFetch, setTriggerFetch] = useState("");  // Variable para activar la actualización
  const [data, setLocalData] = useState(null);  

  // Llamada al hook dentro de useEffect para asegurar que solo se ejecute cuando sea necesario
  const consultaData = useEffectDespachos(page, setPending,pending, idConsulta, idSelect);

  // Cuando los datos obtenidos cambian, actualiza el estado local y global
  useEffect(() => {
    if (idConsulta && idSelect) {
    if (consultaData?.data) {
      setLocalData(consultaData.data);  // Guardamos los datos obtenidos
      setData(consultaData.data);       // Actualizamos el estado global con los datos obtenidos
    }
  }
  }, [idConsulta, idSelect,consultaData, setData]);

  // Se ejecuta cuando se presiona el botón
  const consultarDespacho = () => {
    console.log("Consultar despacho:", idConsulta, idSelect);
    setPending(true);  // Activamos la carga
    
    setTriggerFetch((prev) => !prev);  // Esto activa el cambio en triggerFetch
  };

  return (
    
    <Row className="align-items-center g-2">
    <Col xs={8}>
      <InputGroup>
        <InputGroup.Text id="basic-addon1">Buscar Orden de Entrega</InputGroup.Text>
        <Form.Control
          placeholder="ODE/Despacho Id "
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={idConsulta}
          onChange={(e)=>setIdConsulta(e.target.value)}

        />
      </InputGroup>
    </Col>

    <Col xs={2}>
      <Form.Select aria-label="Default select ID"
      value={idSelect}
      onChange={(e)=>setIdSelect(e.target.value)}

      >
        <option value="1">ODE</option>
        <option value="2">FullStar ID</option>
      </Form.Select>
    </Col>

    <Col xs={2}>
      <Button onClick={consultarDespacho}>Consultar</Button>
    </Col>
  </Row>
  );
};

export default FiltroDespachos;
