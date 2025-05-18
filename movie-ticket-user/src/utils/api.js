import axiosInstance from "./axiosInstance";

export const registerUser = (data) => {
    console.log("registerUser()");

    return axiosInstance.post(`/user/register`, data);
}