import axios from "axios";

// axios.defaults.headers.common = {
//   "Content-Type": "application/json"
// }
// axios.defaults.headers.common = { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDNhZjlhZjFiYzY0OWE2MmNiNzM1NmUiLCJ1c2VybmFtZSI6ImhlbnJpcXVlQGdtYWlsLmNvbSIsImlhdCI6MTYxNDczNDY3OCwiZXhwIjoxNjE1MzM5NDc4fQ.bRrLcal-GDQLHLmGlBgzmO81eOneHqLziUNWKqrkncQ'}` };

// export const getUsers = () => {
//   try {
//     const g = axios.get('/user');

//     const d = g.then(res =>
//         res.data);

//         console.log("d ", d);
//     return d;
//   } catch (error) {
//     console.log(error)
//     throw new Error(error)
//   }
// }

console.log("REACT_APP_API_URL", process.env.REACT_APP_API_URL);

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "https://meu-assistente.herokuapp.com/",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default api;
