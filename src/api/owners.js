import ApiClient from "./client";


const register =async (name, NID, phone, address) => ApiClient.post('/owner/register', {name, NID, phone, address});
const getOwners = async () => {
    const result = await ApiClient.get("/owner/");
    return result.data;
}

const ownerApi = {register, getOwners}
export default ownerApi