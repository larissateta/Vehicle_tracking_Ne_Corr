import ApiClient from "./client";

const register = async (chasisNumber, manufacturer, manufactureYear, price, model, owner) => ApiClient.post("/cars/register", {chasisNumber, manufacturer, manufactureYear, price, model, owner})
const getCars = async ()=> {
    const result= await ApiClient.get('/cars/');
    return result.data;
}

const carsApi = {getCars, register}
export default carsApi