import env from '@/config/env';
import axios from 'axios';

const isServer = typeof window === 'undefined';
const baseURL = isServer
    ? (env.NEXTAUTH_URL
        ? `${env.NEXTAUTH_URL}/api/v1`
        : 'https://api.qrdeck.com/api/v1')
    : '/api/v1';

const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    withCredentials: true,
});

export default axiosInstance;


