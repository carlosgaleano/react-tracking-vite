// useFetchDespachos.js
import { useState, useEffect } from "react";
import { getDespachos } from "../helpers/getDespachos";
import { useDespachosStore } from "../store/despachos";

export const useEffectDespachosFilter = (page , idConsulta, idSelect, refresh) => {
    const [state, setState] = useState({
      data: [],
      totalRow: null,
      totalPage: null,
      currentPage: null,
    });

   const { loading, setLoading } = useDespachosStore(); 
  
    useEffect(() => {
      let isActive = true;
      setLoading(true);
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
            setLoading(false); 
          }
        })
        .catch(error => console.error("Error:", error));
  
      return () => { isActive = false; };
    }, [page, refresh]); // Dependencias clave
  
    return {...state,loading};
  };