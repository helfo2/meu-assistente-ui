import API from '../api';

const BASE_ADDR = 'auth';

class AuthService {
  login(email, password) {
    return API.post(BASE_ADDR + '/login', {
      email, 
      password
    })
    .then(res => {
      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data)); 
      }

      return res.data;
    })
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(name, email, password) {
    return API.post(BASE_ADDR + '/register', {
      name,
      email,
      password
    }).then(res => {
      return res.status === 200;
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();

