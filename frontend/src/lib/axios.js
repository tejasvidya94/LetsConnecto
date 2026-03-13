import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "localhost:5001/api",
    withCredentials: true,
})