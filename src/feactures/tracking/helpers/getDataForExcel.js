//import axios from "axios";
import axios from "../../../libs/axios";
export const getDataForExcel = async (
  page,
  idConsulta = null,
  idSelect = null,
  itemDespachos = null
) => {
  if (itemDespachos == null || itemDespachos.length == 0) {
    const { data } = await axios.post(`/getDataForExcel?page=${page}`, {
      idConsulta: idConsulta,
      idSelect: idSelect,
    });
    return data;
  } else {
    const numItemDespachos = itemDespachos.length;
    const { data } = await axios.post(`/getDataTracking?page=${page}`, {
      ItemFileDespachos: itemDespachos,
      isExcell: true,
      numItem: numItemDespachos,
    });
    return data.data;
  }
};
