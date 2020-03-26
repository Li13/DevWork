import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:3001",
  timeout: 1000
});

let JWTTOKEN = "";
function getJWTToken(): string {
  if (JWTTOKEN) return JWTTOKEN;
  return (JWTTOKEN = localStorage.getItem("JWTTOKEN") || "");
}

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const jwtToken = getJWTToken();
    config.headers.Authorization = `Bearer ${jwtToken}`;
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    return res.data;
  },
  error => Promise.reject(error)
);

export default instance;
