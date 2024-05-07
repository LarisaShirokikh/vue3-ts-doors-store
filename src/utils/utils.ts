import config from "../config/urlConfig";

export const photoUrl = (path: string) => {
  if (path.startsWith("/uploads/")) {
    return `${config.apiUrl}${path}`;
  }
  return path;
};
