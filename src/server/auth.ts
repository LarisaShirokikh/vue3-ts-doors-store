import axios from "axios";

export const authenticateUser = async (token: string): Promise<boolean> => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/verify', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 201) {
            return true; // Токен верифицирован
        } else {
            return false; // Токен не верифицирован
        }
    } catch (error) {
        console.error('Ошибка при верификации токена:', error);
        return false;
    }
};

export const authenticateWithEmailPassword = async (email: string, password: string): Promise<any | null> => {
    console.log('userDataServer', email, password)
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email,
            password,
        });
        console.log('response.data', response.data)
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Ошибка при аутентификации:', error);
        return null;
    }
};

export const getUserInfo = async (email: string) => {
    try {
        const response = await axios.get('http://localhost:3000/api/user/email', {
            params: {
                email: email,
            },
        });
        console.log("response.data verify", response.data)
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении информации о пользователе:', error);
        throw error;
    }
};