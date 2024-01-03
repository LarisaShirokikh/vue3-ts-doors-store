import axios from 'axios';

export const uploadCsvData = async (formData: any) => {
  try {
    const response = await axios.post('http://localhost:3000/api/product/createMany', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Данные успешно отправлены на сервер', response.data);
    // Дополнительные действия после успешной отправки, если нужно
  } catch (error) {
    console.error('Ошибка при отправке данных на сервер', error);
    // Дополнительные действия при ошибке
    throw error; // Можно выбросить ошибку для дальнейшей обработки в компоненте
  }
};
    
    