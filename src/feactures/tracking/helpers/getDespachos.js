
//import axios from "axios";
import axios from '../../../libs/axios';
export const getDespachos = async (page,idConsulta =null, idSelect=null ) => {

 const {data}= await axios.post(`/despachosx?page=${page}`,{
    idConsulta: idConsulta,
    idSelect:idSelect
});
  return data;
 }
