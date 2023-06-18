import ApiClient from "./client";


const register =async (name, NID, phone, address) => ApiClient.post('/owner/register', {name, NID, phone, address});
const getOwners = async () => {
    const result = await ApiClient.get("/owner/");
    return result.data;
}
const getOwner = async (ownerId) => {
    const result = await ApiClient.get(`/owner/${ownerId}`)
    return result.data;
}
const deleteOwner = async (ownerId) => {
    const result = await ApiClient.delete(`/owner/${ownerId}`);
    return result;
}

const ownerApi = {register, getOwners, getOwner, deleteOwner}
export default ownerApi