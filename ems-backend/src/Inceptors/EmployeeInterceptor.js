import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081/api/employee',  
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        

        const token =localStorage.getItem('token');

       
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
       
        console.log("error at interceptor - ", error);
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
       
        return response;
    },
    (error) => {
        
        if(error.response.status ===401){
            console.log('Unauthorized, logging out...');
           
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;