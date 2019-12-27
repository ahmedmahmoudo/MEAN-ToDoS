import axios from 'axios';

export const http = axios;


export const setToken = (token) => {
       axios.defaults.headers.common['Authorization'] = token;
}

