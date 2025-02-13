
//import axios from "axios";
import axios from '../../../libs/axios';
export const getDataForExcel = async (page,idConsulta =null, idSelect=null ) => {

 const {data}= await axios.post(`/getDataForExcel?page=${page}`,{
    idConsulta: idConsulta,
    idSelect:idSelect
});
  return data;
 }
