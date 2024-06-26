const config: UrlConfig = {
  apiUrl: "https://api.dverietalon.ru",
  API_URL: "https://api.dverietalon.ru/api",
  ALLOWED_ORIGIN: "https://api.dverietalon.ru",
};

export default config;

interface UrlConfig {
  apiUrl: string;
  API_URL: string;
  ALLOWED_ORIGIN: string;
}


// const config: UrlConfig = {
//   apiUrl: "http://localhost:4200",
//   API_URL: "http://localhost:4200/api",
//   ALLOWED_ORIGIN: "https://api.dverietalon.ru",
// };

// export default config;

// interface UrlConfig {
//   apiUrl: string;
//   API_URL: string;
//   ALLOWED_ORIGIN: string;
// }