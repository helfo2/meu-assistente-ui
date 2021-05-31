import jwtDecode from "jwt-decode";

import EventSystem from "../helpers/EventSystem";
import api from "../api/api";

const BASE_ADDR = "auth";

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("accessToken"));

export const login = (email, password) =>
  api
    .post(`${BASE_ADDR}/login`, {
      email,
      password,
    })
    .then((res) => {
      if (res.data) {
        localStorage.setItem("accessToken", JSON.stringify(res.data));

        EventSystem.publish("USER_LOGIN");
      }

      return res.data;
    });

export const logout = () => {
  localStorage.removeItem("accessToken");

  EventSystem.publish("USER_LOGOUT");
};

export const register = (name, email, password) =>
  api
    .post(`${BASE_ADDR}/register`, {
      name,
      email,
      password,
    })
    .then((res) => res.status === 200);

export const changePassword = async (oldPassword, newPassword) => {
  const tryLogin = await login(
    jwtDecode(getCurrentUser()).username,
    oldPassword
  );

  if (tryLogin) {
    return api
      .post(
        `${BASE_ADDR}/change-password`,
        {
          oldPassword,
          newPassword,
        },
        { headers: { Authorization: `Bearer ${getCurrentUser()}` } }
      )
      .then((res) => res.status === 204);
  }
  return { message: "Senha atual inválida" };
};

export const getCurrentUserName = () => {
  const { username } = jwtDecode(getCurrentUser());
  const firstLetter = username[0];
  const name = username.substring(0, username.indexOf("@"));
  const lastLetter = name[name.length - 1];

  return (firstLetter + lastLetter).toUpperCase();
};
