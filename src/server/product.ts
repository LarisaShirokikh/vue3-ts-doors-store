import { Category } from "@/types/catalogType";
import { Product } from "@/types/productType";
import axios, { AxiosResponse } from "axios";

interface TokenData {
  token: string;
}

export const sendProductToServer = async (data: FormData): Promise<any> => {
  console.log("sendProductToServer", data);

  try {
    const storedToken = sessionStorage.getItem("userToken");

    if (!storedToken) {
      throw new Error("User token not found.");
    }

    const { token }: TokenData = JSON.parse(storedToken);

    const response: AxiosResponse<any> = await axios.post(
      "http://localhost:3000/api/product",
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

export const getProductById = async (productId: number): Promise<Product> => {
  try {
    const response: AxiosResponse<Product> = await axios.get(
      `http://localhost:3000/api/product/${productId}`
    );
    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 404
    ) {
      console.error("Продукт не найден:", error);
    } else {
      console.error("Ошибка при отправке запроса:", error);
    }
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response: AxiosResponse<Product> = await axios.get(
      `http://localhost:3000/api/product`
    );
    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 404
    ) {
      console.error("Продукты не найден:", error);
    }
  }
};
export const getProductsWithPagination = async (
  startIndex: number,
  endIndex: number
) => {
  const response = await axios.get(
    `http://localhost:3000/api/product/pagination?startIndex=${startIndex}&endIndex=${endIndex}`
  );
  return response.data;
};

export const getProductsByCatalogId = async (catalogId: number): Promise<Product> => {
  try {
    const response: AxiosResponse<Product> = await axios.get(
      `http://localhost:3000/api/product/${catalogId}`
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};
