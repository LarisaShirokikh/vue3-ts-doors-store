import axios, { AxiosResponse } from "axios";
import { TokenData } from "./video";
const API_URL = "http://localhost:4200/api";

type ServicesData = FormData

export const sendServiceToServer = async (data: ServicesData): Promise<any> => {
  console.log("service formData", data);

  try {
    const storedToken = sessionStorage.getItem("userToken");

    if (!storedToken) {
      throw new Error("User token not found.");
    }

    const { token }: TokenData = JSON.parse(storedToken);

    const response: AxiosResponse<any> = await axios.post(
      `${API_URL}/services`,
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
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

export const getServices = async (): Promise<any> => {
    try {
    
        const response: AxiosResponse<any> = await axios.get(
          `${API_URL}/services`,
          {}
        );
        // console.log('service after', response.data);

        return response.data;
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        throw error;
    }
}

