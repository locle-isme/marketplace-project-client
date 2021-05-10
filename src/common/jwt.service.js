const KEY_TOKEN = "access_token";
const getToken = () => {
    return localStorage.getItem(KEY_TOKEN);
}

const saveToken = (token) => {
    localStorage.setItem(KEY_TOKEN, token);
}

const destroyToken = () => {
    //localStorage.clear();
    localStorage.removeItem(KEY_TOKEN);
}

export default {getToken, saveToken, destroyToken};