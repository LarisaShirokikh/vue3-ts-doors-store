import axios from "axios";

export const authenticateUser = async (token: string): Promise<boolean> => {
    try {
        const response = await axios.post(
          `${process.env.API_URL}/auth/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

export const authenticateWithPhone = async (
  phone: string
): Promise<any | null> => {
  console.log("userDataServer", phone);
  try {
    const response = await axios.post(`http://localhost:3000/api/auth/login`, {
      
      phone,
    });
    console.log("response.data", response.data);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Ошибка при аутентификации:", error);
    return null;
  }
};

export const sendConfirmCode = async (code: string): Promise<any | null> => {
try {
  const response = await axios.post(`http://localhost:3000/api/auth/login`, {
    code,
  });
  console.log("response.data", response.data);
  const data = response.data;
  return data;
} catch (error) {
  console.error("Ошибка при аутентификации:", error);
  return null;
}
}

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

// export const  loginPhone = async(phone: string) => {
//     try {
//         const response = await axios.post(``)
//     } catch (error) {
        
//     }
// }