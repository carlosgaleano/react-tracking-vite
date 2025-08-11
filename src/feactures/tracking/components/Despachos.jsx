import {useState,useEffect} from 'react';
import DataTable from "react-data-table-component";
import Button from 'react-bootstrap/Button';
import {useEffectDespachos} from '../hooks/useFetchDespachos';
import Loading from '../../menu/components/Loading';
import { NavPagination } from '../../menu/components/NavPagination';
import DespachosDetalle from './DespachosDetalle';
import { TbListDetails } from "react-icons/tb";
import ExcelReader from './ExcelReader';
import FiltroDespachos from './FiltroDespachos';
import {useAuthStore} from '../../../feactures/auth/store/auth'; 
import  { usePaginationStore } from '../../menu/store/paginationStore';


 const DataGridDespachos = ()=>{

  const [modalShow, setModalShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataTable1, setData]=useState([]);
  const { loading, setLoading } = useAuthStore();


 //const [page, setpage] = useState(1);
 //const [pending, setPending] = useState(true);
 //const [refresh, setRefresh] = useState(0);

  const { currentPage:currentPageDespachos, setPage, updatePagination, isExcelData,excelData,resetToDatabase ,setIsExcelData  } = usePaginationStore();


  const { 
    data: dbData, 
    totalrow: dbTotalRow, 
    totalPage: dbTotalPage 
  } = useEffectDespachos(currentPageDespachos, null, null, !isExcelData);

 

  useEffect(() => {
    // Si los datos NO son de Excel, actualizamos con los datos de la base de datos
    if (!isExcelData && dbData) {
      setData(dbData);
      updatePagination(currentPageDespachos, dbTotalPage, dbTotalRow);
    } 
    // Si los datos SÍ son de Excel, simplemente mostramos los datos del store
    else if (isExcelData) {
      // No hacemos nada aquí, ya que el estado se actualizó en ExcelReader
    }
  }, [dbData, isExcelData]);


const showData=(row)=>{
  console.log('Selected row:', row); 
  // Handle the selected row data here
  //setSelectedRow(row); 
 setSelectedRow(row);
 setModalShow(true);

}

//console.log('datos,',data[1]);
//console.log('page actual',currentPage);
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
               <>
               <DespachosDetalle
                    show={modalShow}
                    onHide={() => {
                        setModalShow(false);
                        setSelectedRow(null); // Limpiar la fila seleccionada al cerrar el modal
                    }}
                    row={selectedRow}
                />
             

            </>
            )}

      <FiltroDespachos setData={setData} setIsExcelData={setIsExcelData} />



          

           

          <> <h1>Lector de Excel  {isExcelData} </h1>

          <ExcelReader  />
         </>

          <p className="d-inline  ml-2" >
            <i className="bi bi-bar-chart text-info" style={{ fontSize: 40 }}></i>
          </p>
          
          <DataTable
            title=" Despachos"
            columns={columns}
             data={isExcelData ? excelData : dataTable1} // <-- Muestra datos de Excel o de la base de datos
            progressPending={loading}
            progressComponent={<Loading />}
            //pagination
            //paginationComponent={BootyPagination}
            selectableRows
           /* onRowClicked={(row) => {
              showData(row); 
              
            }} */// Use onRowClicked prop
            //selectableRowsComponent={BootyCheckbox}
          />
         
           <NavPagination  />

        </>
      );
    };
    
    export default DataGridDespachos;
    