import ApiClient from "./client";

const login = async(email, password) => ApiClient.post('/login', {email, password})
const signup = async(name, phone, NID, email, password) => ApiClient.post('/register', {name, phone, NID, email, password})

const authApi = {login, signup}
export default authApi