import axios from "axios";
import LocalStorageUtil from "../store/localStorageUtil"
import Constant from "../store/constant";
const baseUrl = "http://localhost:8084";
const httpService = axios.create({
    baseURL: baseUrl,
    timeout: 4000,
    headers: {'X-Custom-Header': 'foobar'},
    withCredentials: true,
    transformRequest: [function (data, headers) {
        data = JSON.stringify(data)
        return data;
    }],
    transformResponse: [function (data) {
        return data;
    }],
});
httpService.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';
httpService.defaults.headers['Access-Control-Allow-Origin'] = '*';
httpService.interceptors.response.use(
    (response) => {
        const authorization = response.headers['authorization'];
        if(authorization!==undefined && authorization!==null) {
            LocalStorageUtil.setData(Constant.JWT_TOKEN_KEY, authorization.toString())
        }
        return response
    },
    (error) => {
        console.log("Error in httpService.interceptors.response.use")
        return Promise.reject(error);
    }
)
export default httpService
export {baseUrl}