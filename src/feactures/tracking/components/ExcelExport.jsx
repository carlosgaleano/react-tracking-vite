import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFetDespachoDataExcel } from "../hooks/useFetDespachoDataExcel";
import  { usePaginationStore } from '../../menu/store/paginationStore';

const ExportExcel = (filtro = null) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("Obteniendo datos...");
  const [dataExcel, setDataExcel] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const isGenerating = useRef(false);

  const { isExcelData, excelData } = usePaginationStore();

    let getDataExcel = [];
  /* if (!isExcelData) {
    getDataExcel=excelData || [];
  }else {
  getDataExcel = useFetDespachoDataExcel(refresh);
  } */

  getDataExcel = useFetDespachoDataExcel(refresh);

useEffect(() => {

  if (isExcelData) {
    console.log("isExcelData is true, using excelData:", excelData);
    getDataExcel.data = excelData || [];
        console.log("isExcelData is true, using excelData:", getDataExcel);

  }

}, [isExcelData]);

  // ⬇️ Función para manejar el clic del botón de exportar
  const handleExport = () => {
    console.log("Botón exportar pulsado");
    setShowModal(true);
    setMessage("Obteniendo datos...");
    setRefresh((prev) => prev + 1); // Forzamos una nueva solicitud de datos
  };

  useEffect(() => {
    console.log("Efecto ejecutado con getDataExcel:", getDataExcel);

    if (getDataExcel.loading) {
      setMessage("Cargando datos...");
    } else if (getDataExcel.error) {
      console.error("API Error:", getDataExcel.error);
      toast.error(`Error: ${getDataExcel.error.message}`);
      setShowModal(false);
    } else if (getDataExcel.data && !isGenerating.current) {
      console.log("Datos obtenidos, generando Excel...");
      isGenerating.current = true;
      setDataExcel(getDataExcel.data);
      generateExcel(getDataExcel.data);
    }
  }, [getDataExcel]);

  // ⬇️ Función para generar el archivo Excel
  const generateExcel = (data) => {
    if (!data || data.length === 0) {
      toast.error("No hay datos para exportar.");
      setShowModal(false);
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Despacho");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, "despacho.xlsx");
    setShowModal(false);
    isGenerating.current = false;
  };

  return (
    <>
 
 <Button onClick={handleExport} className="btn btn-success">
        <FaRegFileExcel />
      </Button>


      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>{message}</Modal.Body>
      </Modal>
    </>
  );
};

export default ExportExcel;
