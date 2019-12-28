const baseUrl = 'http://localhost:8000/api';

const Urls = {
    'login': `${baseUrl}/users/login`,
    'register': `${baseUrl}/users/new`,
    'fetchInfo': `${baseUrl}/users`,
    'projects': `${baseUrl}/projects`,
}

export const getUrl = (urlName) => {
    let url = Urls[urlName];
    if(url) return url;
    throw "Url not found";
}

export const getNewUrl = (urlName) => {
    let url = getUrl(urlName);
    return `${url}/new`;
}

export const getUpdateUrl = (urlName, id) => {
    let url = getUrl(urlName);
    return `${url}/${id}/update`;
}

