import axios, { AxiosResponse } from "axios";
import { TokenData } from "./video";

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
      "http://localhost:3000/api/services",
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
    
        const response: AxiosResponse<any> = await axios
            .get('http://localhost:3000/api/services', {
            });
        // console.log('service after', response.data);

        return response.data;
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        throw error;
    }
}

