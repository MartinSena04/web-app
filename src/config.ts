import axios from 'axios';

//Axios config ---------------------------------------------------
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
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

