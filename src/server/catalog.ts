import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { createRequestConfig } from "./lib/catalog-lib";
import { Category } from "@/types/catalogType";

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
  return handleRequest("http://localhost:3000/api/categories", "post", data, {
    headers: config.headers,
  });
};

export const getCategoryById = async (catalogId: number): Promise<Category> => {
  try {
    const response: AxiosResponse<Category> = await axios.get(
      `http://localhost:3000/api/categories/catalog/${catalogId}`
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

export const getCatalogByChapterId = async (chapterId: number): Promise<Category[]> => {
  console.log("chapterId", chapterId);
  try {
    const response: AxiosResponse<Category[]> = await axios.get(
      `http://localhost:3000/api/chapter/category/${chapterId}`
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

// export const getPopulyarCategory = async (): Promise<Category[]> => {
//   try {
//     const response: AxiosResponse<Category[]> = await axios.get(
//       `http://localhost:3000/api/categories/populyar/populyar`
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Ошибка при отправке запроса:", error);
//     throw error;
//   }
// };

export const getWiteCategory = async (): Promise<Category[]> => {
  try {
    const response: AxiosResponse<Category[]> = await axios.get(
      `http://localhost:3000/api/categories/categories/category`
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
    "http://localhost:3000/api/categories",
    "get",
    undefined,
    { headers: config.headers }
  );
};


export const updateCatalog = async (
  data: CatalogData,
  catalogId: number
): Promise<CatalogResponse> => {
  const config = createRequestConfig();
  return handleRequest(
    `http://localhost:3000/api/categories/${catalogId}`,
    "put",
    data,
    { headers: config.headers }
  );
};

export const deleteCatalogRequest = async (
  catalogId: number
): Promise<number> => {
  const config = createRequestConfig();
  return handleRequest(
    `http://localhost:3000/api/categories/${catalogId}`,
    "delete",
    undefined,
    { headers: config.headers }
  );
};

export const fetchDataFromServer = async (index: any): Promise<any> => {
  const config = createRequestConfig();
  return handleRequest(
    `http://localhost:3000/api/categories/${index}`,
    "get",
    undefined,
    { headers: config.headers }
  );
};

export const fetchBestsellers = async (): Promise<any> => {
  return handleRequest("http://localhost:3000/api/product", "get");
};
