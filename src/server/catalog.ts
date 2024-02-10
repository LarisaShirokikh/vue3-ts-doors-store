import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { createRequestConfig } from './lib/catalog-lib';

const getToken = () => {
    const storedToken = sessionStorage.getItem('userToken');
    return storedToken ? JSON.parse(storedToken).token : '';
};

type CatalogData = FormData; 
type CatalogResponse = any; 

const handleRequest = async <T>(url: string, 
    method: string, data?: FormData, additionalConfig?: AxiosRequestConfig): Promise<T> => {
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

export const sendCatalogToServer = async (data: CatalogData): Promise<CatalogResponse> => {
    console.log('data', data);
    const config = createRequestConfig();
    return handleRequest('http://localhost:3000/api/categories', 'post', data, { headers: config.headers });
};

export const getCategoryById = async (catalogId: number)
: Promise<CatalogResponse> => {
    const config = createRequestConfig();
    return handleRequest(
      `http://localhost:3000/api/categories/${catalogId}`,
      "get",
      undefined,
      { headers: config.headers }
    );
};

export const getCatalogs = async (): Promise<CatalogResponse> => {
    const config = createRequestConfig();
    return handleRequest('http://localhost:3000/api/categories',
     'get', undefined, { headers: config.headers });
};

export const getCatalogsForLeftMenu = async (): Promise<CatalogResponse> => {
    try {
        const response: AxiosResponse<CatalogResponse> = await axios
        .get('http://localhost:3000/api/categories/le');
        console.log("Response from server:", response);
        return response.data;
    } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 404
        ) {
          console.error("Каталоги не найдены:", error);
        } else {
          console.error("Ошибка при отправке запроса:", error);
        }
        throw error;
    }
};

export const updateCatalog = async (data: CatalogData, catalogId: number): Promise<CatalogResponse> => {
    const config = createRequestConfig();
    return handleRequest(`http://localhost:3000/api/categories/${catalogId}`, 'put', data, { headers: config.headers });
};

export const deleteCatalogRequest = async (catalogId: number): Promise<number> => {
    const config = createRequestConfig();
    return handleRequest(`http://localhost:3000/api/categories/${catalogId}`, 'delete', undefined, { headers: config.headers });
};

export const fetchDataFromServer = async (index: any): Promise<any> => {
    const config = createRequestConfig();
    return handleRequest(`http://localhost:3000/api/categories/${index}`, 'get', undefined, { headers: config.headers });
};

export const fetchBestsellers = async (): Promise<any> => {
    return handleRequest('http://localhost:3000/api/product', 'get');
};
