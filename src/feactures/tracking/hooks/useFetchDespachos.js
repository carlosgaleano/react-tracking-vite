import { useState, useEffect } from "react";
import { getDespachos } from "../helpers/getDespachos";
import {useAuthStore} from '../../../feactures/auth/store/auth'; 


export const useEffectDespachos = (page, idConsulta = null, idSelect = null) => {
  const [state, setState] = useState({
    data: [],
    totalRow: null,
    totalPage: null,
    currentPage: null,
  });
 // const [loading, setLoading] = useState(true);
 const { loading, setLoading } = useAuthStore(); 
  useEffect(() => {
    const controller = new AbortController(); // Creamos un AbortController
    const signal = controller.signal; // Obtenemos la señal

    let isActive = true;
    setLoading(true);

    getDespachos(page, idConsulta, idSelect, signal) // Pasamos la señal a getDespachos
      .then((despachos) => {
        if (isActive && !signal.aborted) { // Verificamos que no se haya abortado la petición
          setState({
            data: Object.values(despachos.data),
            totalPage: despachos.last_page,
            totalrow: despachos.total,
            currentPage: despachos.current_page,
            rowsPerPage: despachos.per_page,
          });
        }
      })
      .catch((error) => {
        if (isActive) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
                return; // Salimos del catch si es un error de aborto
            }
          console.error("Error fetching despachos:", error);
        }
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
      controller.abort(); // Abortamos la petición anterior al desmontar el componente o cambiar las dependencias
    };
  }, [page, idConsulta, idSelect]);

  return { ...state, loading };
};


