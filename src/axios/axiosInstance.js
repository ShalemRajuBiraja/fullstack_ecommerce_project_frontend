import axios from 'axios';
import { AUTH_CONFIG } from '../constants/ConstantUrl';

const axiosInstance = axios.create({
    baseURL : AUTH_CONFIG.BASE_URL,
    timeout : AUTH_CONFIG.TIME_OUT,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (req) => {
                const token = localStorage.getItem(AUTH_CONFIG.TOKEN);
                if (token) {
                    req.headers[AUTH_CONFIG.AUTHORIZATION] = `${AUTH_CONFIG.BEARER} ${token}`;
                }
                return req;
    },
    (error) => Promise.reject(error)
);
// Response interceptor
axiosInstance.interceptors.response.use(

    response => {
        if (response.headers[AUTH_CONFIG.AUTHORIZATION] !== undefined) {
            localStorage.removeItem(AUTH_CONFIG.TOKEN);
     
        }
        return response;
    },
    error => {
      return Promise.reject(error)
 }
);



export default axiosInstance;