import jwtDecode from "jwt-decode";

import EventSystem from "helpers/EventSystem";
import API from "../API";

const BASE_ADDR = "auth";

class AuthService {
  login(email, password) {
    return API.post(BASE_ADDR + "/login", {
      email,
      password,
    }).then((res) => {
      if (res.data) {
        localStorage.setItem("accessToken", JSON.stringify(res.data));

        EventSystem.publish("USER_LOGIN");
      }

      return res.data;
    });
  }

  logout() {
    localStorage.removeItem("accessToken");

    EventSystem.publish("USER_LOGOUT");
  }

  register(name, email, password) {
    return API.post(BASE_ADDR + "/register", {
      name,
      email,
      password,
    }).then((res) => {
      return res.status === 200;
    });
  }

  async changePassword(oldPassword, newPassword) {
    const tryLogin = await this.login(
      jwtDecode(this.getCurrentUser()).username,
      oldPassword
    );

    if (tryLogin) {
      return API.post(
        BASE_ADDR + "/change-password",
        {
          oldPassword,
          newPassword,
        },
        { headers: { Authorization: `Bearer ${this.getCurrentUser()}` } }
      ).then((res) => {
        return res.status === 204;
      });
    } else {
      return { message: "Senha atual inválida" };
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("accessToken"));
  }

  getCurrentUserName() {
    const username = jwtDecode(this.getCurrentUser()).username;
    const firstLetter = username[0];
    let name = username.substring(0, username.indexOf("@"));
    const lastLetter = name[name.length - 1];

    return (firstLetter + lastLetter).toUpperCase();
  }
}

export default new AuthService();
