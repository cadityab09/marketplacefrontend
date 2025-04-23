import axios from "axios";
import LocalStorageUtil from "../store/localStorageUtil"
import Constant from "../store/constant";
const baseUrl = "http://localhost:8084";
const httpService = axios.create({
    baseURL: baseUrl,
    timeout: 4000,
    // headers: {},
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
        // Extract the authorization token from headers if available
        // const authorization = response.headers['authorization'];
        // if (authorization) {
        //     LocalStorageUtil.setData(Constant.JWT_TOKEN_KEY, authorization.toString());
        // }

        // Extract the backend response data
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;        console.log("Response data:", data);
        if (data) {
            console.log("Response data:", data);
            // Save additional data from the backend response to local storage
            if (data.jwt) {
                LocalStorageUtil.setData(Constant.JWT_TOKEN_KEY, data.jwt); // Save JWT token
            }
            if (data.userRole) {
                LocalStorageUtil.setData(Constant.USER_ROLE_KEY, data.userRole); // Save user role
            }
            if (data.userName) {
                LocalStorageUtil.setData(Constant.USER_NAME_KEY, data.userName); // Save username
            }
            if (data.userId) {
                LocalStorageUtil.setData(Constant.USER_ID_KEY, data.userId); // Save user ID
            }
            if (data.identity) {
                LocalStorageUtil.setData(Constant.IDENTITY_KEY, data.identity); // Save identity
            }
        }

        return response;
    },
    (error) => {
        console.log("Error in httpService.interceptors.response.use:", error);
        return Promise.reject(error);
    }
);
export default httpService
export {baseUrl}