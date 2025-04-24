import httpService from "./HttpService";
import LocalStorageUtil from "../store/localStorageUtil";
import Constant from "../store/constant";
export const httpPost = (data) => httpService.post(`/users/login`, data)

export const postLogin = (values) => httpService.post(`/users/login`, {username:values.username, password:values.password, identity:values.identity})

export const postAccessToken = () => {
    console.log("postAccessToken: ", LocalStorageUtil.getAllKeys());
    const jwtToken = LocalStorageUtil.getData(Constant.JWT_TOKEN_KEY);
    const userRole = LocalStorageUtil.getData(Constant.USER_ROLE_KEY);
    const userName = LocalStorageUtil.getData(Constant.USER_NAME_KEY);
    const userId = LocalStorageUtil.getData(Constant.USER_ID_KEY);
    const identity = LocalStorageUtil.getData(Constant.IDENTITY_KEY);

    if (!jwtToken) {
        return Promise.reject(new Error('JWT Token is missing in local storage'));
    }

    // Return the local storage objects as a resolved promise
    return Promise.resolve({
        jwtToken,
        userRole,
        userName,
        userId,
        identity,
    });
};

export const postRegister = (data) => httpService.post('/users/register', data)

export const postBrands = (data) => httpService.post('/api/franchisor-brands', data)

export const putBrands = (id, data) => httpService.post(`/api/franchisor-brands/${id}`, data)