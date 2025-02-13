import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFetDespachoDataExcel } from "../hooks/useFetDespachoDataExcel";

const ExportExcel = (filtro = null) => {
  const [showModal, setShowModal] = useState(false);

  const [blink, setBlink] = useState(true);
  const [message, setMessage] = useState(
    "Por favor, espere mientras se obtienen los datos.."
  );
  const [dataExcel, setDataExcel] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const getDataExcel = useFetDespachoDataExcel( refresh);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500); // Parpadea cada 500ms

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

 
  useEffect(() => {
    if (getDataExcel.data) {
      console.log("data", getDataExcel.data);
        setDataExcel(getDataExcel.data);
        generateExcel();
      } else if (getDataExcel.error) {
        console.error("API Error:", getDataExcel.error);
        toast.error(`API Error: ${getDataExcel.error.message}`); // Display a user-friendly error message
        setShowModal(false); // Close the modal, as there's no data to export
        setMessage('Error al obtener los datos.'); // Update the message
    } else if (getDataExcel.loading) {
        setMessage('Cargando datos...'); // Display loading message
    }
}, [getDataExcel]);

  const exportToExcel = (data, fileName) => {
    // ... (código de la función exportToExcel)
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelBuffer], { type: fileType });
    saveAs(blob, fileName + fileExtension);
  };

  const generateExcel = () => {
    if (!dataExcel || dataExcel.length === 0) {
      // Check if data is available
      console.warn("No data to export.");
      toast.warn("No hay datos para exportar.");
      setShowModal(false); // Close the modal if no data
      return; // Important: Stop execution to prevent errors.
    }

    setTimeout(() => {
      setMessage("Generando Archivo Excel...");
    }, 1500);

    exportToExcel(dataExcel, "my_excel_file"); // Use dataExcel here!

    setTimeout(() => {
      setShowModal(false);
      toast.success("Archivo Excel generado y descargado correctamente.");
    }, 3500);
  };

  const handleExport = () => {
    setShowModal(true);
    setMessage("Por favor, espere mientras se obtienen los datos.....");
    toast.info("Generando archivo Excel...");
    console.log("handleExport");
    setRefresh((prev) => prev + 1); // Forzar nueva búsqueda

    //toast.success('Archivo Excel generado y descargado correctamente.');
  };

  return (
    <div>
      <Button onClick={handleExport} className="btn btn-success">
        <FaRegFileExcel />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Button className="btn btn-success">Generando Excel</Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span style={{ opacity: blink ? 1 : 0 }}>{message}</span>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExportExcel;
