import axios, { AxiosResponse } from "axios";
import { TokenData } from "./video";

export type requestData = {
    serviceName: string;
    shotDesc: string;
    serviceCon: string;
    price: string;
    decor: string;
    decorDesc: string;
    photoLink: string;
}

export const sendServiceToServer = async (data: requestData): Promise<any> => {
    console.log('service', data);

    try {
        const storedToken = sessionStorage.getItem('userToken');

        if (!storedToken) {
            throw new Error('User token not found.');
        }

        const { token }: TokenData = JSON.parse(storedToken);


        const response: AxiosResponse<any> = await axios
            .post('http://localhost:3000/api/services', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        console.log('service after', response.data);

        return response.data;
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        throw error;
    }
};

export const getServices = async (): Promise<any> => {
    try {
    
        const response: AxiosResponse<any> = await axios
            .get('http://localhost:3000/api/services', {
            });
        console.log('service after', response.data);

        return response.data;
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        throw error;
    }
}

