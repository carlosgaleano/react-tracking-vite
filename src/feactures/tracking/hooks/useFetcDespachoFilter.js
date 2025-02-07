// useFetchDespachos.js
import { useState, useEffect } from "react";
import { getDespachos } from "../helpers/getDespachos";


export const useEffectDespachosFilter = (page , setPending, idConsulta, idSelect, refresh) => {
    const [state, setState] = useState({
      data: [],
      totalRow: null,
      totalPage: null,
      currentPage: null,
    });
  
    useEffect(() => {
      let isActive = true;
      setState(prev => ({ ...prev, data: [] })); // Limpiar datos previos
  
      getDespachos(page, idConsulta, idSelect)
        .then(despachos => {
          if (isActive) {
            setState({
              data: Object.values(despachos.data),
              totalPage: despachos.last_page,
              totalRow: despachos.total,
              currentPage: despachos.current_page,
             
            });
            setPending(false);
          }
        })
        .catch(error => console.error("Error:", error));
  
      return () => { isActive = false; };
    }, [page, refresh]); // Dependencias clave
  
    return state;
  };