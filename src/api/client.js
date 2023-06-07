import {create} from "apisauce"

const ApiClient = create({
    baseURL: "http://localhost:4000/api",
    timeout: 1000000
})

export default ApiClient