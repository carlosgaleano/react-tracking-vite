import { useState,useEffect } from "react";
import { getDespachos } from "../helpers/getDespachos";
import { useDespachosStore } from "../store/despachos";

export const useEffectDespachos = (page, idConsulta = null, idSelect = null) => {
  const { setData, setLoading,loading, setTotalPage } = useDespachosStore();
   const [state, setState] = useState({
    data: [],
    totalRow: null,
    totalPage: null,
    currentPage: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let isActive = true;
   if (loading==false && isActive) {

   
    setLoading(true);

    getDespachos(page, idConsulta, idSelect, signal)
      .then((despachos) => {
        if (isActive && !signal.aborted) {
          setState({
            data: Object.values(despachos.data),
            totalPage: despachos.last_page,
            totalRow: despachos.total,
            currentPage: despachos.current_page,
            rowsPerPage: despachos.per_page,
          });
          setTotalPage(despachos.last_page);
          
        }
      }
    
    )
      .catch((error) => {
        if (isActive) {
          if (error.name === 'AbortError') {
            console.log('Fetch aborted');
            return;
          }
          console.error("Error fetching despachos:", error);
        }
      })
      .finally(() => {
        if (isActive) {
          console.log('Fetch finished');
          setLoading(false);
        /*   setTimeout(() => {
            setLoading(false);
        }, 300); */
        }
      });
    }
    return () => {
      isActive = false;
      controller.abort();
    };
  }, [page, idConsulta, idSelect]);

  return {...state};  
}

