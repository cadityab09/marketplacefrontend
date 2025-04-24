import axios from "axios";
import LocalStorageUtil from "../store/localStorageUtil"
import Constant from "../store/constant";
const baseUrl = "http://192.168.112.163:8084";
const httpService = axios.create({
    baseURL: baseUrl,
    timeout: 40000,
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
httpService.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8; multipart/form-data';
httpService.defaults.headers['Access-Control-Allow-Origin'] = '*';

httpService.interceptors.request.use(
    (config) => {
        // Retrieve the JWT token from local storage
        const jwtToken = LocalStorageUtil.getData(Constant.JWT_TOKEN_KEY);
        if (jwtToken) {
            // Add the Authorization header with the Bearer token
            config.headers['Authorization'] = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors
        console.error("Error in request interceptor:", error);
        return Promise.reject(error);
    }
);

httpService.interceptors.request.use(
    (config) => {
        const jwtToken = LocalStorageUtil.getData(Constant.JWT_TOKEN_KEY);
        if (jwtToken) {
            config.headers['Authorization'] = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => {
        console.error("Error in request interceptor:", error);
        return Promise.reject(error);
    }
);

export const getHeaders = () => {
    const jwtToken = LocalStorageUtil.getData(Constant.JWT_TOKEN_KEY);
    return {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
    };
};

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
export const getUrl = () =>{
    return baseUrl;
}