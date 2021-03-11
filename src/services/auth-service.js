import EventSystem from "helpers/EventSystem";
import API from "../api";

const BASE_ADDR = "auth";

class AuthService {
  login(email, password) {
    return API.post(BASE_ADDR + "/login", {
      email,
      password,
    }).then((res) => {
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));

        EventSystem.publish("USER_LOGIN");
      }

      return res.data;
    });
  }

  logout() {
    localStorage.removeItem("user");

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

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
