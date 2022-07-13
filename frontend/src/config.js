import Axios from "axios";

export const axiosInstance = Axios.create({
    baseURL: "https://e-vinoteka.herokuapp.com/",
    crossDomain: true,
})
