const key = "authToken";

const getToken = (token) => localStorage.getItem(token);
const setToken = (token) => localStorage.setItem('token',token);
const removeToken  = () => localStorage.removeItem('token');

const authStorage = {getToken, setToken, removeToken}

export default authStorage