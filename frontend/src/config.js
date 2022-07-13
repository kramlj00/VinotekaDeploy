import Axios from "axios";

export const axiosInstance = Axios.create({
    baseURL: process.env.BASE_URL
})
