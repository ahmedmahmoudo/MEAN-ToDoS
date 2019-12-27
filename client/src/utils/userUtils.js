import {http} from './httpUtils';

import getUrl from '../helpers/urlHelper';

export const register = (form) => {
    let url = getUrl('register');
    return http.post(url, form);
}

export const login = (form) => {
    let url = getUrl('login');
    return http.post(url, form);
}