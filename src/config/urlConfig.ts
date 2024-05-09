const config: UrlConfig = {
  apiUrl: "http://api.dverietalon.ru:4200",
  API_URL: "http://api.dverietalon.ru:4200/api",
  ALLOWED_ORIGIN: "http://api.dverietalon.ru",
};

export default config;

interface UrlConfig {
  apiUrl: string;
  API_URL: string;
  ALLOWED_ORIGIN: string;
}
