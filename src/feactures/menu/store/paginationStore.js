import { create } from 'zustand';

export const usePaginationStore = create((set) => ({
  // ... (otros estados)
  currentPage: 1,
  totalPage: 1,
  totalrow: 0,
  isExcelData: false, // <-- Nuevo estado para controlar el origen de los datos
  excelData: [],     // <-- Nuevo estado para almacenar los datos del Excel

  // ... (otras acciones)
  setPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPage: pages }),
  setTotalRows: (rows) => set({ totalrow: rows }),
  setIsExcelData: (isExcel) => set({ isExcelData: isExcel }),
  updatePagination: (newCurrentPage, newTotalPages, newTotalRows) => set({
    currentPage: newCurrentPage,
    totalPage: newTotalPages,
    totalrow: newTotalRows,
  }),

  // <-- Nueva acción para manejar la carga de datos de Excel
  setExcelDataSource: (dataExcel,totalPage_api, totalrow_api,currentPageApi) => set({
  
    isExcelData: true,
    excelData: dataExcel,
    currentPage: currentPageApi,
    totalPage: totalPage_api, // Asume 10 filas por página
    totalrow: totalrow_api,
  }),
  
  // <-- Nueva acción para volver a la fuente de datos original
  resetToDatabase: () => set({
    isExcelData: false,
    excelData: [],
    currentPage: 1,
    totalPage: 1, // Se actualizará después de la nueva consulta
    totalrow: 0,  // Se actualizará después de la nueva consulta
  }),
}));