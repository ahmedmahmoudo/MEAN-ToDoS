import {http, setToken} from './httpUtils';

import {getUrl, getNewUrl, getUpdateUrl} from '../helpers/urlHelper';

export const register = (form) => {
    let url = getUrl('register');
    return http.post(url, form);
}

export const login = (form) => {
    let url = getUrl('login');
    return http.post(url, form);
}

export const fetchUser = (token) => {
    setToken(token);
    let url = getUrl('fetchInfo');
    return http.get(url);
}

export const getProjects = () => {
    let url = getUrl('projects');
    return http.get(url);
}

export const createProject = (form) => {
    let url = getNewUrl('projects');
    return http.post(url, form);
}

export const updateProject = (id, form) => {
    let url = getUpdateUrl('projects', id);
    return http.put(url, form);
}