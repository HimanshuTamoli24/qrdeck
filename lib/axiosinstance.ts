import env from '@/config/env';
import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: `${env.NEXTAUTH_URL}/api/v1` || 'https://api.qrdeck.com/api/v1',
    timeout: 10000,
    withCredentials: true,
});

export default axiosInstance;


