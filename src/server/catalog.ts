import axios from "axios";

export const sendCatalogToServer = async (data: FormData) => {
    console.log('sendCatalogToServer', data);
    try {
        let token = '';

        const storedToken = sessionStorage.getItem('userToken');
        if (storedToken) {
            const tokenData = JSON.parse(storedToken);
            token = tokenData.token;
        }

        const response = await axios.post('http://localhost:3000/api/categories', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                 'Content-Type': 'multipart/form-data',
            },
        });

        console.log('response.data', response.data)
        const res = response.data;
        return res;
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        throw error; 
    }
};

export const getCatalogs = async () => {
    try {
        let token = '';

        const storedToken = sessionStorage.getItem('userToken');
        if (storedToken) {
            const tokenData = JSON.parse(storedToken);
            token = tokenData.token;
        }
        const catalogs = await axios.get('http://localhost:3000/api/categories', {
            headers: {
                Authorization: `Bearer ${token}`,
                //  'Content-Type': 'multipart/form-data',
            },
        })
        const res = catalogs.data;
        return res;
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        throw error; 
    }
}