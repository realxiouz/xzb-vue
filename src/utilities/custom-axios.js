import axios from 'axios';

const customAxios = axios.create({
    baseURL: '/api',
    timeout: 60000,
    validateStatus: () => true,
});

export default customAxios;
