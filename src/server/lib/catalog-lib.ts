import { AxiosRequestConfig } from "axios";

export const getToken = () => {
    const storedToken = sessionStorage.getItem('userToken');
    return storedToken ? JSON.parse(storedToken).token : '';
};

export const createRequestConfig = (): AxiosRequestConfig => {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    };
};