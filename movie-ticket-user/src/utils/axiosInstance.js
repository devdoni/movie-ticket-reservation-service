import axios from 'axios';

const axiosInstance =
    axios.create({
        baseURL: 'http://localhost:8090/',
        timeout: 10000,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

export default axiosInstance;