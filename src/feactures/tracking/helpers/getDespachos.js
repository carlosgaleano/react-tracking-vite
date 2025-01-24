
//import axios from "axios";
import axios from '../../../libs/axios';
export const getDespachos = async (page) => {

 const {data}= await axios.get(`/despachosx?page=${page}`);
  return data;
 }
