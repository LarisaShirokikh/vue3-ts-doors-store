import { Review } from "@/types/reviewType";
import axios, { AxiosResponse } from "axios";

export type requestData = {
  rating: number;
  reviewName: string;
  description: string;
  photo: string;
};

interface TokenData {
    token: string;
}

export const sendReview = async (data: FormData): Promise<any> => {
    console.log('Data before sending axios:', data);
    try {
        const storedToken = sessionStorage.getItem('userToken');

        if (!storedToken) {
            throw new Error('User token not found.');
        }

        const { token }: TokenData = JSON.parse(storedToken);

        const response: AxiosResponse<any> = await axios.post(
          "http://localhost:3000/api/review",
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
}

export const getReviews = async () => {
    try {
        const response: AxiosResponse<Review> = await axios
            .get(`http://localhost:3000/api/review`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
            console.error('Отзывы не найдены:', error);
        } else {
            console.error('Ошибка при отправке запроса:', error);
        }
        throw error;
    }
}