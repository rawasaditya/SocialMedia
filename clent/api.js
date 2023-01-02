import axios from 'axios';
const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    withCredentials: true,
});

API.interceptors.response.use(function (res) { return res }, function (err) {
    if (err.response.status === 401) {
        window.location = "/login"
    }
})
export default API;