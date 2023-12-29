import axios from 'axios';

//Axios config ---------------------------------------------------
const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.75:5000',
    headers: {
        'Authorization': null
    }

  });

function initializeAxios() {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    }
}
//-----------------------------------------------------------------


export {axiosInstance,initializeAxios};

