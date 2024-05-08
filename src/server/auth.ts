import axiosService from "@/utils/axiosService";

class AuthService {
  constructor() {}

  async authenticateUser(token: string): Promise<boolean> {
    try {
      const response = await axiosService.post("/auth/verify", {});
      console.log("response", response);
      return response.status === 201;
    } catch (error) {
      console.error("Ошибка при верификации токена:", error);
      return false;
    }
  }

  async authenticateWithEmail(
    email: string,
    password: string
  ): Promise<any | null> {
    console.log("userDataServer", email);
    try {
      const response = await axiosService.post("/auth/login", {
        email,
        password,
      });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при аутентификации:", error);
      return null;
    }
  }

  async registerWithEmail(
    email: string,
    password: string,
    name: string
  ): Promise<any | null> {
    console.log("userDataServer", email, password, name);
    try {
      const response = await axiosService.post("/user", {
        email,
        password,
        name,
      });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при регистрации пользователя:", error);
      return null;
    }
  }

  async sendConfirmCode(code: string): Promise<any | null> {
    try {
      const response = await axiosService.post("/auth/login", { code });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке кода подтверждения:", error);
      return null;
    }
  }

  async getUserInfo(email: string): Promise<any> {
    try {
      const response = await axiosService.get("/user/email", {
        params: { email },
      });
      console.log("response.data verify", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Ошибка при получении информации о пользователе по email:",
        error
      );
      throw error;
    }
  }
}

export default AuthService;
