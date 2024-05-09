const config: UrlConfig = {
  apiUrl: "http://localhost:4200",
  API_URL: "http://localhost:4200/api",
  ALLOWED_ORIGIN: "https://dverietalon.ru",
};

export default config;

interface UrlConfig {
  apiUrl: string;
  API_URL: string;
  ALLOWED_ORIGIN: string;
}
