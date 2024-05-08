import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { createRequestConfig } from "./lib/catalog-lib";
import { Category } from "@/types/catalogType";
import { TokenData } from "./video";
import config from "@/config/urlConfig";

const getToken = () => {
  const storedToken = sessionStorage.getItem("userToken");
  return storedToken ? JSON.parse(storedToken).token : "";
};

type CatalogData = FormData;
type CatalogResponse = any;

const handleRequest = async <T>(
  url: string,
  method: string,
  data?: FormData,
  additionalConfig?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await axios({
      url,
      method,
      data: data || undefined,
      ...additionalConfig,
      headers: {
        ...additionalConfig?.headers
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Ошибка при отправке запроса на ${url}:`, error);
    throw error;
  }
};

export const sendCatalogToServer = async (
  data: CatalogData
): Promise<CatalogResponse> => {
  console.log("data", data);
  const configReq = createRequestConfig();
  return handleRequest(`${config.API_URL}/categories`, "post", data, {
    headers: {
      ...configReq.headers,
    },
  });
};

export const getCategoryById = async (catalogId: number): Promise<Category> => {
  try {
    const response: AxiosResponse<Category> = await axios.get(
      `${config.API_URL}/categories/catalog/${catalogId}`
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

export const getCatalogByChapterName = async (chapterName: string): Promise<Category[]> => {
  console.log("chapterName", chapterName);
  try {
    const response: AxiosResponse<Category[]> = await axios.get(
      `${config.API_URL}/chapter/category/${chapterName}`
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

export const checkCatalogName = async (
  newCatalogName: string
): Promise<boolean> => {
  console.log("chapterName", newCatalogName);
  try {
    const response: AxiosResponse<Category> = await axios.get(
      `${config.API_URL}/categories/category/${newCatalogName}`
    );

    return !!response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};


export const getWiteCategory = async (): Promise<Category[]> => {
  try {
    const response: AxiosResponse<Category[]> = await axios.get(
      `${config.API_URL}/categories/categories/category`
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

export const getCatalogs = async (): Promise<CatalogResponse> => {
  const configReq = createRequestConfig();
  return handleRequest(`${config.API_URL}/categories`, "get", undefined, {
    headers: {
      ...configReq.headers,
    },
  });
};


export const updateCatalog = async (data: CatalogData, catalogId: number) => {
  try {
    const storedToken = sessionStorage.getItem("userToken");

    if (!storedToken) {
      throw new Error("User token not found.");
    }

    const { token }: TokenData = JSON.parse(storedToken);
    const response: AxiosResponse<any> = await axios.put(
      `${config.API_URL}/categories/${catalogId}`,
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

export const deleteCatalogId = async (catalogId: number) => {
  try {
    const storedToken = sessionStorage.getItem("userToken");

    if (!storedToken) {
      throw new Error("User token not found.");
    }

    const { token }: TokenData = JSON.parse(storedToken);
    const response: AxiosResponse<any> = await axios.delete(
      `${config.API_URL}/categories/${catalogId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

export const fetchDataFromServer = async (index: any): Promise<any> => {
  const configReq = createRequestConfig();
  return handleRequest(
    `${config.API_URL}/categories/${index}`,
    "get",
    undefined,
    {
      headers: {
        ...configReq.headers,
      },
    }
  );
};


export const fetchBestsellers = async (): Promise<any> => {
  return handleRequest(`${config.API_URL}/product`, "get", undefined);
};
