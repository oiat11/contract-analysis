import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ,
    withCredentials: true, // This is important for sending cookies with requests

})

export const logout = async () => {
    const response = await api.get("/auth/logout");
    return response.data;
};