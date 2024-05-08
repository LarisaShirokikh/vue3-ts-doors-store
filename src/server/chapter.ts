import axios, { AxiosResponse } from "axios";
import { TokenData } from "./video";
import { Category } from "@/types/catalogType";
import config from "@/config/urlConfig";

export const updateChapter = async (data: FormData, chapterId: number) => {
  console.log("updateChapter", data, chapterId);
  try {
    const storedToken = sessionStorage.getItem("userToken");

    if (!storedToken) {
      throw new Error("User token not found.");
    }

    const { token }: TokenData = JSON.parse(storedToken);
    const response: AxiosResponse<any> = await axios.put(
      `${config.API_URL}/chapter/${chapterId}`,
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

export const deleteChapterId = async (chapterId: number) => {
  try {
    const storedToken = sessionStorage.getItem("userToken");

    if (!storedToken) {
      throw new Error("User token not found.");
    }

    const { token }: TokenData = JSON.parse(storedToken);
    const response: AxiosResponse<any> = await axios.delete(
      `${config.API_URL}/chapter/${chapterId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

export const sendChapterToServer = async (data: FormData): Promise<any> => {
  console.log("sendChapterToServer", data);

  try {
    const storedToken = sessionStorage.getItem("userToken");

    if (!storedToken) {
      throw new Error("User token not found.");
    }

    const { token }: TokenData = JSON.parse(storedToken);

    const response: AxiosResponse<any> = await axios.post(
      `${config.API_URL}/chapter`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Origin: config.ALLOWED_ORIGIN,
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
  

    const response: AxiosResponse<any> = await axios.get(
      `${config.API_URL}/chapter`,
      {
        headers: {
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

export const getChapterById = async (chapterId: number): Promise<Chapter> => {
  try {
    const response: AxiosResponse<Chapter> = await axios.get(
      `${config.API_URL}/chapter/${chapterId}`
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

export const getChapterForUpdate = async (
  chapterId: number
): Promise<Chapter> => {
  try {
    const response: AxiosResponse<Chapter> = await axios.post(
      `${config.API_URL}/chapter/getchapter`,
      { chapterId }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

export const getCatalogsByChapterName = async (
  chapterName: string
): Promise<Category[]> => {
  try {
    const response: AxiosResponse<Category[]> = await axios.get(
      `${config.API_URL}/categories/chapter/${chapterName}`,
      {
        headers: {
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

export type Chapter = {
  id: string;
  name: string;
  photo: string;
  description: string;
  category: Category[];
};
