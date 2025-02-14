import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFetDespachoDataExcel } from "../hooks/useFetDespachoDataExcel";

const ExportExcel = (filtro = null) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("Obteniendo datos...");
  const [dataExcel, setDataExcel] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const isGenerating = useRef(false);
  const [exportTriggered, setExportTriggered] = useState(false); 

  const getDataExcel = useFetDespachoDataExcel(refresh);

 
  useEffect(() => {
    if (exportTriggered) { // Solo se ejecuta si se ha pulsado el botón
        if (getDataExcel.data && !isGenerating.current) {
            isGenerating.current = true;
            setDataExcel(getDataExcel.data);
            generateExcel(getDataExcel.data);
        } else if (getDataExcel.error) {
            console.error("API Error:", getDataExcel.error);
            toast.error(`Error: ${getDataExcel.error.message}`);
            setShowModal(false);
            setMessage('Error al obtener los datos.');
            isGenerating.current = false;
        } else if (getDataExcel.loading) {
            setMessage('Cargando datos...');
        }
        setExportTriggered(false); // Restablecer el trigger
    }
}, [getDataExcel, exportTriggered]); 

  const exportToExcel = (data, fileName) => {
    console.log("exporToExcel ejecutado"); 
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(data);

    const header = Object.keys(data[0]);
    const headerCellStyle = {
      font: { bold: true },
      fill: { fgColor: { rgb: "00FFFF" } },
    };

    header.forEach((col, index) => {
      const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 });
      ws[cellAddress].v = col.toUpperCase();
      ws[cellAddress].s = headerCellStyle;
    });

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: fileType });

    saveAs(blob, fileName + fileExtension);
    isGenerating.current = false; // Restablecer después de la descarga
  };

  const generateExcel = (data) => {
    if (!data || data.length === 0) {
      console.warn("No data to export.");
      toast.warn("No hay datos para exportar.");
      setShowModal(false);
      isGenerating.current = false; // Restablecer si no hay datos
      return;
    }

    setMessage("Generando Archivo Excel...");
    exportToExcel(data, "my_excel_file");

    setTimeout(() => {
      setShowModal(false);
      toast.success("Archivo generado correctamente.");
    }, 1500);
  };

  const handleExport = () => {
    setShowModal(true);
    setMessage("Obteniendo datos...");
    toast.info("Generando archivo Excel...");
    setRefresh(prevRefresh => prevRefresh + 1);
    setExportTriggered(true); 
  };

  return (
    <div>
      <Button onClick={handleExport} className="btn btn-success">
        <FaRegFileExcel />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Generando Excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
      </Modal>
    </div>
  );
};

export default ExportExcel;