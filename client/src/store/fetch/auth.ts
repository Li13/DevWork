import { message } from "antd";
import axios from "./axios";
import { history } from "@/router";
const MD5 = require("md5.js");

export function createMD5(content: string) {
  return new MD5().update(content).digest("hex");
}

export function login(username: string, password: string) {
  const key = "login_loading";
  message.loading({ content: "登录中", key });
  return axios.post("/auth/login", { username, password: createMD5(password) }).then(
    res => {
      localStorage.setItem("JWT_Token", res.data.access_token);
      message.success({ content: "登录成功", key });
      const state: { preUrl?: string } = history.location.state || {};
      history.push(state.preUrl || "/");
      return res;
    },
    err => {
      const data = err.response.data;
      message.error({ content: data.message || "登录失败", key });
    }
  );
}

export function logout() {
  return localStorage.removeItem("JWT_Token");
}

export function goLogin() {
  history.push("/login", {
    preUrl: history.location.pathname
  });
}
