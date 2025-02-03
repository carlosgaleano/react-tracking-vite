
//import axios from "axios";
import axios from '../../../libs/axios';
export const updateDespachos = async (page,dataExcel) => {

  
 const {data}= await axios.post(`/updateForFile?page=${page}`, {
    data: dataExcel 
});
  return data;
 }
