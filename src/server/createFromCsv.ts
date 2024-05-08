import axios from 'axios';
import config from "@/config/urlConfig";

export const uploadCsvData = async (formData: any) => {
  try {
    const response = await axios.post(
      `${config.API_URL}/product/createMany`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log('Данные успешно отправлены на сервер', response.data);
  } catch (error) {
    console.error('Ошибка при отправке данных на сервер', error);
    throw error; 
  }
};
    
    