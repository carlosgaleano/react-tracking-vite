
//import axios from "axios";
import axios from '../../../libs/axios';
export const getDespachos = async (page, idConsulta = null, idSelect = null, signal) => {
  console.trace("getDespachos llamado con page:", page, "idConsulta:", idConsulta, "idSelect:", idSelect);
  try {
    const { data } = await axios.post(`/despachosx?page=${page}`, {
      idConsulta: idConsulta,
      idSelect: idSelect,
    }, {
      signal: signal, // Pasamos la señal a axios
    });
    return data;
  } catch (error) {
     if (error.name === 'AbortError') {
        console.log('Fetch aborted');
        return; // Salimos del catch si es un error de aborto
    }
    console.error("Error en getDespachos:", error);
    throw error; // Re-lanzamos el error para que lo capture el useEffect
  }
};