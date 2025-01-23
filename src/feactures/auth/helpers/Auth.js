
import axios from "../../../libs/axios";

export const LoginRequest = async (email, password) => {


  try {
    return await axios.post("/login", { email, password });
  } catch (error) {
    console.log("error", error);

    return null;
  }
};

export const ProfileRequest = async () => {
  //const token=useAuthStore.getState().token;
  //console.log('token',token);
  //axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
  // return await axios.get('http://localhost/api/v2/me');
  //return await axios.get('https://apitsa.logytechchile.cl/api');
};

