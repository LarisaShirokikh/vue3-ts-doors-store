import axios, { AxiosResponse } from "axios";
import { TokenData } from "./video";
import { Category } from "@/types/catalogType";
export const updateChapter = () => {};

export const sendChapterToServer = async (data: FormData): Promise<any> => {
  console.log("sendChapterToServer", data);

  try {
    const storedToken = sessionStorage.getItem("userToken");

    if (!storedToken) {
      throw new Error("User token not found.");
    }

    const { token }: TokenData = JSON.parse(storedToken);

    const response: AxiosResponse<any> = await axios.post(
      "http://localhost:3000/api/chapter",
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

export const getChapters = async (): Promise<any> => {
  try {
    const storedToken = sessionStorage.getItem("userToken");

    if (!storedToken) {
      throw new Error("User token not found.");
    }
    const { token }: TokenData = JSON.parse(storedToken);

    const response: AxiosResponse<any> = await axios.get(
      "http://localhost:3000/api/chapter",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log('service after', response.data);

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

export const getChapterById = async (chapterId: number): Promise<Chapter> => {
  try {
    const response: AxiosResponse<Chapter> = await axios.get(
      `http://localhost:3000/api/chapter/${chapterId}`);

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

export const getCatalogsByChapterId = async (
  chapterId: number
): Promise<Category> => {
  try {
    const response: AxiosResponse<Chapter> = await axios.get(
      `http://localhost:3000/api/categories/${chapterId}`
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

export type Chapter = {
  id: string;
  name: string;
  photo: string;
  description: string;
  category: Category[];
};