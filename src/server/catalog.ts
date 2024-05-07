import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { createRequestConfig } from "./lib/catalog-lib";
import { Category } from "@/types/catalogType";
import { TokenData } from "./video";
const API_URL = "http://localhost:4200/api";
const ALLOWED_ORIGIN = "http://localhost:3000";

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
  const config = createRequestConfig();
  return handleRequest(`http://localhost:4200/api/categories`, "post", data, {
    headers: {
      ...config.headers,
    },
  });
};

export const getCategoryById = async (catalogId: number): Promise<Category> => {
  try {
    const response: AxiosResponse<Category> = await axios.get(
      `http://localhost:4200/api/categories/catalog/${catalogId}`
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
      `http://localhost:4200/api/chapter/category/${chapterName}`
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
      `http://localhost:4200/api/categories/category/${newCatalogName}`
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
      `http://localhost:4200/api/categories/categories/category`
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

export const getCatalogs = async (): Promise<CatalogResponse> => {
  const config = createRequestConfig();
  return handleRequest(
    `http://localhost:4200/api/categories`,
    "get",
    undefined,
    {
      headers: {
        ...config.headers,
      },
    }
  );
};


export const updateCatalog = async (data: CatalogData, catalogId: number) => {
  try {
    const storedToken = sessionStorage.getItem("userToken");

    if (!storedToken) {
      throw new Error("User token not found.");
    }

    const { token }: TokenData = JSON.parse(storedToken);
    const response: AxiosResponse<any> = await axios.put(
      `http://localhost:4200/api/categories/${catalogId}`,
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
      `http://localhost:4200/api/categories/${catalogId}`,
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
  const config = createRequestConfig();
  return handleRequest(
    `http://localhost:4200/api/categories/${index}`,
    "get",
    undefined,
    {
      headers: {
        ...config.headers,
      },
    }
  );
};


export const fetchBestsellers = async (): Promise<any> => {
  return handleRequest(`http://localhost:4200/api/product`, "get", undefined);
};
