import axiosInstance from "./axiosInstance";

export const registerUser = (data) => {
    console.log("registerUser()");

    return axiosInstance.post(`/user/register`, data);
}

export const loginUser = (data) => {
    console.log("loginUser()");

    return axiosInstance.post(`/user/login`, data);
}

export const authenticateUser = () => {
    console.log("authenticateUser()");

    return axiosInstance.get(`/auth/me`, { withCredentials: true });
}

export const logoutUser = () => {
    console.log("logoutUser()");

    return axiosInstance.post(`/user/logout`, { withCredentials: true });
}