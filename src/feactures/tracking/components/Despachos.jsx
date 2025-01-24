import {useState} from 'react';
import DataTable from "react-data-table-component";
import Button from 'react-bootstrap/Button';
import {useEffectDespachos} from '../hooks/useFetchDespachos';
import Loading from '../../menu/components/Loading';
import { NavPagination } from '../../menu/components/NavPagination';
import DespachosDetalle from './DespachosDetalle';
import { TbListDetails } from "react-icons/tb";




 const DataGridDespachos = ()=>{

  const [modalShow, setModalShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

 const [page, setpage] = useState(1);
 const [pending, setpending] = useState(true);


const {data:data,currentPage:currentPage,totalrow,totalPage,rowsPerPage}= useEffectDespachos(page,setpending);

const showData=(row)=>{
  console.log('Selected row:', row); 
  // Handle the selected row data here
  //setSelectedRow(row); 
 setSelectedRow(row);
 setModalShow(true);

}

console.log('datos,',data[1]);
console.log('page actual',currentPage);
const columns = [
    {
      name: "Orden de Entrega",
      selector: (row) => row.sap_id,
    },
    {
      name: "Id FullStar",
      selector: (row) => row.Despacho_ID,
   
    },
    {
      name: "Titulo",
      selector: (row) => row.Nombre,
    },
    {
      name: "Dirección",
      selector: (row) => row.Direccion,
    },
    {
      name: "Fecha despacho",
      selector: (row) => row.fecha_st,
      format: "datetime",
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.estado_out,
    },
    {
      name: 'Detalle',
      button: true,
      cell: (row) => <Button onClick={() => {
        showData(row); 
        
      }}><TbListDetails /></Button>,
    },
  ];




    return (
        <>



  {/* Renderizado condicional del modal */}
  {modalShow && ( // Solo se renderiza si modalShow es true
                <DespachosDetalle
                    show={modalShow}
                    onHide={() => {
                        setModalShow(false);
                        setSelectedRow(null); // Limpiar la fila seleccionada al cerrar el modal
                    }}
                    row={selectedRow}
                />
            )}
          
          
          <p className="d-inline  ml-2" >
            <i className="bi bi-bar-chart text-info" style={{ fontSize: 40 }}></i>
          </p>
          
          <DataTable
            title=" Despachos"
            columns={columns}
            data={data}
            progressPending={pending}
            progressComponent={<Loading />}
            //pagination
            //paginationComponent={BootyPagination}
            selectableRows
           /* onRowClicked={(row) => {
              showData(row); 
              
            }} */// Use onRowClicked prop
            //selectableRowsComponent={BootyCheckbox}
          />
         
           <NavPagination data={{setpage,totalrow,totalPage,currentPage,setpending, pending}} />

        </>
      );
    };
    
    export default DataGridDespachos;
    