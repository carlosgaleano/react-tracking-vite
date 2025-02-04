import { useState, useEffect } from "react";
import { getDespachos } from "../helpers/getDespachos";

export const useEffectDespachos = (page,setPending, pending,idConsulta =null, idSelect=null ) => {
 
  console.log("idConsulta:", idConsulta, "idSelect:", idSelect);
  const [state, setState] = useState({
    data: [],
    totalRow:null,
    totalPage:null,
    currentPage:null,
    
  
  });
  //setpending(true);
  useEffect(() => {
    let isActive = true; // Bandera para controlar la ejecución
    getDespachos(page,idConsulta,idSelect )
    .then((despachos) => {
      if (isActive) {
      console.log("page", page, "response", despachos, "numero", despachos.current_page);
      setState({
        data: Object.values(despachos.data),
        totalPage:despachos.last_page,
        totalrow:despachos.total,
        currentPage: despachos.current_page ,
        rowsPerPage:despachos.per_page
       
      });
      setPending(false);
    }
    }).catch((error) => {
      if (isActive) {
        console.error("Error fetching despachos:", error);
        setPending(false); // Asegúrate de desactivar el estado de "pending" en caso de error
      }
    });
    return () => {
      isActive = false; // Limpia la bandera cuando el componente se desmonta
    };
  }, [page, setPending,pending]);

  return state;
};
