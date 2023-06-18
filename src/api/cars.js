import ApiClient from "./client";

const register = async (chasisNumber, manufacturer, manufactureYear, price, model, owner) => ApiClient.post("/cars/register", {chasisNumber, manufacturer, manufactureYear, price, model, owner})
const getCars = async ()=> {
    const result= await ApiClient.get('/cars/');
    return result.data;
}
const deleteCar = async (id)=>{
    const result = await ApiClient.delete(`/cars/${id}`);
    return result;
}

const carsApi = {getCars, register, deleteCar}
export default carsApi