import axios, { AxiosResponse } from 'axios';
const API_URL = "http://localhost:3000/api";

export interface TokenData {
    token: string;
}

export const addVideo = async (data: FormData): Promise<any> => {
    console.log('videos', data);

    try {
        const storedToken = sessionStorage.getItem('userToken');

        if (!storedToken) {
            throw new Error('User token not found.');
        }

        const { token }: TokenData = JSON.parse(storedToken);

        const response: AxiosResponse<any> = await axios.post(
          `${API_URL}/videos`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data;
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        throw error;
    }
};

export const getVideo = async (): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axios.get(
          `${API_URL}/videos`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching user videos:', error);
        throw error;
    }
}
