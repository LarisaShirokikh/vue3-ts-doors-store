import axios, { AxiosInstance, AxiosResponse } from "axios";
import { TokenData } from "@/server/video";
import config from "@/config/urlConfig";

class AxiosService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: config.API_URL,
    });

    this.instance.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem("userToken");
        if (token) {
          config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error("Ошибка:", error);
        if (error.response && error.response.data) {
          return Promise.reject(error.response.data);
        }
        return Promise.reject(error.message);
      }
    );
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

const axiosService = new AxiosService().getInstance();
export default axiosService;
