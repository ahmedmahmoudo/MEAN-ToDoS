import axios from 'axios';

export const http = axios.create();

export const setToken = (token) => {
    http.defaults.headers.common['Authorization'] = token;
}
