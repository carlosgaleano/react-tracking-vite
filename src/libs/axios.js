
import axios from 'axios'
import { useAuthStore } from '../feactures/auth/store/auth';

const authApi= axios.create({
   // baseURL: "http://localhost/api/v2",
    baseURL: "https://apitsa.logytechchile.cl/api",
    withCredentials:true
})

authApi.interceptors.request.use(config => {
    const token=useAuthStore.getState().token;
    console.log(token);
    config.headers={
        
         Authorization: `Bearer ${token}`,


     
        
    }
    return config
})

export default authApi