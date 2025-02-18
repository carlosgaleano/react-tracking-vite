import { useEffect } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import {useState} from 'react';
import {useEffectDespachosFilter} from '../hooks/useFetcDespachoFilter';
import { GrClearOption } from "react-icons/gr";
import ExportExcel from "./ExcelExport";


const FiltroDespachos = ({setData}) => {

  const [idConsulta, setIdConsulta] = useState("");
  const [idSelect, setIdSelect] = useState("1");
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0); // Nuevo estado para refrescar

  

  
  const consultaData = useEffectDespachosFilter(page, idConsulta, idSelect, refresh);

  const consultarDespacho = () => {
    if ( !idSelect) return;
   
    setRefresh(prev => prev + 1); // Forzar nueva búsqueda
  };

  // Actualizar datos globales cuando haya nuevos resultados
  useEffect(() => {
    if (consultaData.data) {
      setData(consultaData.data);
    
    }
  }, [consultaData.data, setData]);

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

    <Col xs={1}>
      <Form.Select aria-label="Default select ID"
      value={idSelect}
      onChange={(e)=>setIdSelect(e.target.value)}

      >
        <option value="1">ODE</option>
        <option value="2">FullStar ID</option>
      </Form.Select>
    </Col>

    <Col xs={1}>
      <Button onClick={consultarDespacho}>Consultar</Button>
    </Col>
    <Col xs={1}>
      <Button onClick={() => {
        setIdConsulta("");
        setIdSelect("1");
        setRefresh(prev => prev + 1); // Forzar nueva búsqueda
     
      }}
      className="btn btn-warning"
      >
        <GrClearOption />
      </Button>
    </Col>
    <Col xs={1}>
      <ExportExcel />
    </Col>
  </Row>
  );
};

export default FiltroDespachos;
