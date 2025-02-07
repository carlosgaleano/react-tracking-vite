import  { useState,useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FaRegFileExcel } from "react-icons/fa";
import { Button,Modal  } from "react-bootstrap";
import { toast } from 'react-toastify';

const ExportExcel = (filtro =null) => {

    const [showModal, setShowModal] = useState(false);

    const [blink, setBlink] = useState(true);

useEffect(() => {
  const interval = setInterval(() => {
    setBlink(prev => !prev);
  }, 500); // Parpadea cada 500ms

  return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
}, []);

  const exportToExcel = (data, fileName) => {
    // ... (código de la función exportToExcel)
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
  
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
    const blob = new Blob([excelBuffer], { type: fileType });
    saveAs(blob, fileName + fileExtension);
  };

  const handleExport = () => {
    setShowModal(true);
    toast.info('Generando archivo Excel...');
    const data = [
        { name: 'John Doe', age: 30, email: 'john.doe@example.com' },
        { name: 'Jane Doe', age: 25, email: 'jane.doe@example.com' },
      ];
    
      exportToExcel(data, 'my_excel_file');
      setTimeout(() => {
        setShowModal(false);
        toast.success('Archivo Excel generado y descargado correctamente.');
    }, 3000);
//toast.success('Archivo Excel generado y descargado correctamente.');
  };

  return (
    <div>
        <Button
        onClick={handleExport}
        className='btn btn-success'
        >
            <FaRegFileExcel  />
        </Button>
        
     
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title   ><Button className='btn btn-success'>Generando Excel</Button></Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <span style={{ opacity: blink ? 1 : 0 }}>
        Por favor, espere mientras se genera el archivo Excel...
        </span>
      </Modal.Body>
    </Modal>
    </div>
  );
};

export default ExportExcel;