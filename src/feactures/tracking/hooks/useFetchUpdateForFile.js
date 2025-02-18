import { useState, useEffect } from "react";
import { updateDespachos } from "../helpers/setDespachos";

export const useEffectSetForFile = (page,setpending,dataExcel) => {
  const [state, setState] = useState({
    data: [],
    totalRow:null,
    totalPage:null,
    currentPage:null,
    
  
  });
 // setpending(true);
  useEffect(() => {
    updateDespachos(page,dataExcel)
    .then((despachos) => {
      console.log("paged", page, "response", despachos, "numero", despachos.current_page);
      setState({
        //data:despachos,
         data: Object.values(despachos?.data),
        totalPage:despachos?.last_page,
        totalrow:despachos?.total,
        currentPage: despachos?.current_page ,
        rowsPerPage:despachos?.per_page
        
      });
     // setpending(false);
    });
  }, [page,dataExcel]);

  return state;
};