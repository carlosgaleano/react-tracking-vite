import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useEffectGetDespachoDetalle } from '../hooks/useFetchDespachoDetalle';

import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Loading from '../../menu/components/Loading';
import moment from 'moment';
import DataTable from "react-data-table-component";




const DespachosDetalle = (props) => {
  const [page, setpage] = useState(1);
  const [pending, setpending] = useState(true);
  const [despachoid, setDespachoID] = useState(null); 
  useEffect(() => {
    setDespachoID(props.row?.Despacho_ID); // Actualizar Despacho_ID cuando props.row cambie
}, [props.row]); // Dependencia crucial: props.row
console.log("Despacho_ID", despachoid);
const { data:data,currentPage:currentPage,totalrow,totalPage,rowsPerPage } = useEffectGetDespachoDetalle(page, setpending, despachoid);

const fechaFormat = (fecha) => {
 return moment(fecha).format('DD-MM-YYYY HH:mm');

};

const columns = [
 {
    name: "Estado",
    selector: (row) => row?.nombre_estado_tracking,
  },
  {
    name: "Fecha despacho",
    selector: (row) => fechaFormat(row?.DT_Status) ,
    format: "datetime",
    sortable: true,
  },
  
  {
    name: "Observación",
    selector: (row) => {
      return row?.estado_observacion ? row?.estado_observacion : row?.comentario_despacho || '-';
  }

  },
];



  return (
    <>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Tracking de la guia {props.row?.sap_id +"-" +props.row?.Despacho_ID}   
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
        <DataTable
            title=" Despachos"
            columns={columns}
            data={data}
            progressPending={pending}
            progressComponent={<Loading />}
            //pagination
            //paginationComponent={BootyPagination}
            selectableRows
           // Use onRowClicked prop
            //selectableRowsComponent={BootyCheckbox}
          />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}   

export default DespachosDetalle;