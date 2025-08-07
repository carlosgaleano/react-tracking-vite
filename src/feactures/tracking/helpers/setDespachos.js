
//import axios from "axios";
import axios from '../../../libs/axios';
export const updateDespachos = async (page,dataExcel) => {

  
 const {data}= await axios.post(`/getDataTracking?page=${page}`, {
    ItemFileDespachos: dataExcel 
});
  return data;
 }
