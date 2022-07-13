import Axios from "axios";

let API_BASE_URL = "";
const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  API_BASE_URL = 'http://localhost:5000';
} else {
  API_BASE_URL = 'https://e-vinoteka.herokuapp.com/';
}

export const axiosInstance = Axios.create({
    baseURL: API_BASE_URL
})
