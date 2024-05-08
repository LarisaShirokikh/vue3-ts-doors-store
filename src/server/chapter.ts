import { AxiosResponse } from "axios";
import axiosService from "@/utils/axiosService";
import { Category } from "@/types/catalogType";
import { Chapter } from "@/types/chapterType";

class ChapterService {
  constructor() {}

  public async updateChapter(data: FormData, chapterId: number): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axiosService.put(
        `/chapter/${chapterId}`,
        data,
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
  }

  public async deleteChapter(chapterId: number): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axiosService.delete(
        `/chapter/${chapterId}`
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      throw error;
    }
  }

  public async sendChapterToServer(data: FormData): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axiosService.post(
        "/chapter",
        data,
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
  }

   async getChapters(): Promise<any[]> {
    try {
      const response: AxiosResponse<any> = await axiosService.get("/chapter");
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      throw error;
    }
  }

  public async getChapterById(chapterId: number): Promise<Chapter> {
    try {
      const response: AxiosResponse<Chapter> = await axiosService.get(
        `/chapter/${chapterId}`
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      throw error;
    }
  }

  public async getChapterForUpdate(chapterId: number): Promise<Chapter> {
    try {
      const response: AxiosResponse<Chapter> = await axiosService.post(
        "/chapter/getchapter",
        { chapterId }
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      throw error;
    }
  }

  public async getCatalogsByChapterName(
    chapterName: string
  ): Promise<Category[]> {
    try {
      const response: AxiosResponse<Category[]> = await axiosService.get(
        `/categories/chapter/${chapterName}`
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      throw error;
    }
  }
}

export default ChapterService;
