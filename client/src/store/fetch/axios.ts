import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "antd";
import { logout, goLogin } from "./auth";

const instance = axios.create({
  baseURL: "http://127.0.0.1:3001",
  timeout: 1000
});

let JWTTOKEN = "";
function getJWTToken(): string {
  if (JWTTOKEN) return JWTTOKEN;
  return (JWTTOKEN = localStorage.getItem("JWT_Token") || "");
}

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const jwtToken = getJWTToken();
    config.headers.Authorization = `Bearer ${jwtToken}`;
    return config;
  },
  err => Promise.reject(err)
);

instance.interceptors.response.use(
  (res: AxiosResponse<any>) => res.data,
  err => {
    const res = err.response;
    if (res) {
      const data = res.data;
      if ((res.status || data.statusCode) === 401) {
        logout();
        if (data.path !== "/auth/login") {
          message.warn("权限不足，请登录后操作");
          setTimeout(() => {
            goLogin();
          }, 800);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
