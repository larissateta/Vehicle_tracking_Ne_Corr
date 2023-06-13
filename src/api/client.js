import {create} from "apisauce"
import authStorage from "../auth/storage"

const ApiClient = create({
    baseURL: "http://localhost:4000/api",
    timeout: 1000000
})
ApiClient.addRequestTransform(request => {
    const token = authStorage.getToken();
    if(token){
        request.headers['Authorization'] = `Bearer ${token}`;
    }
})
export default ApiClient