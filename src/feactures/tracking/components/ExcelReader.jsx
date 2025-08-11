import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { useEffectSetForFile } from '../hooks/useFetchUpdateForFile';
import  { usePaginationStore } from '../../menu/store/paginationStore';


const ExcelReader = () => {
  const [excelData, setExcelData] = useState([]);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); // Store the file
  const { setExcelDataSource, currentPage:currentPageExcel,setFiltro} = usePaginationStore();

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Set the file in state
  };

  
  useEffect(() => {
    if (file) {  // Only process if a file is selected
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          setExcelData(data);
          setError(null);
        } catch (err) {
          setError("Error al leer el archivo Excel. Asegúrate de que el formato sea correcto.");
          console.error("Error parsing Excel:", err);
          setExcelData([]);
        }
      };

      reader.onerror = (error) => {
        setError("Error al cargar el archivo.");
        console.error("Error loading file:", error);
        setExcelData([]);
      };

      reader.readAsBinaryString(file); // Use the file from state
    }
  }, [file]); // The effect runs when 'file' changes



  const {data:dataExcel,currentPage:currentPageApi,totalrow,totalPage,rowsPerPage} = useEffectSetForFile(currentPageExcel, false, excelData);
  
  //if (data){setData(data);}  // Update global data with the fetched data
   useEffect(() => {
        // Esta función se ejecutará cada vez que 'data' cambie.
        if (dataExcel && file) {
           setExcelDataSource(dataExcel,totalPage, totalrow,currentPageApi);
           setFiltro(excelData); // Set the filter to the file name
           console.log("Datos de Excel cargados en el store:", dataExcel);

        }
    }, [dataExcel,file]);
  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {excelData.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(excelData[0]).map((header, index) => ( // More robust header rendering
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
         {/*  <tbody>
            {excelData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => ( // More robust cell rendering
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody> */}
        </table>
      )}
    </div>
  );
};

export default ExcelReader;