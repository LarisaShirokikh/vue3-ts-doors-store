import config from "../config/urlConfig";

export const photoUrl = (path: string) => {
  if (path.startsWith("/uploads/")) {
    return `${config.apiUrl}${path}`;
  }
  return path;
};

export const videoUrl = (path: string) => {
  if (path.startsWith("/video/")) {
    return `${config.apiUrl}${path}`;
  }
  return path;
};
