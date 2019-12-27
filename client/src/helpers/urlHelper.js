const Urls = {
    'login': 'http://localhost:8000/api/users/login',
    'register': 'http://localhost:8000/api/users/new'
}

const getUrl = (urlName) => {
    let url = Urls[urlName];
    if(url) return url;
    throw "Url not found";
}

export default getUrl;