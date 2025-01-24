import  { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelReader = () => {
  const [excelData, setExcelData] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // header: 1 para incluir la primera fila como encabezado

        setExcelData(data);
        setError(null); // Limpiar cualquier error anterior
      } catch (err) {
        setError("Error al leer el archivo Excel. Asegúrate de que el formato sea correcto.");
        console.error("Error parsing Excel:", err);
        setExcelData([]); // Limpiar los datos en caso de error
      }
    };
    reader.onerror = (error) => {
      setError("Error al cargar el archivo.");
      console.error("Error loading file:", error);
      setExcelData([]);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Mostrar mensaje de error */}

      {excelData.length > 0 && (
        <table>
          <thead>
            <tr>
              {excelData[0].map((header, index) => ( // Renderizar encabezados
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.slice(1).map((row, rowIndex) => ( // Renderizar filas de datos (omitiendo la primera fila que son los encabezados)
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelReader;