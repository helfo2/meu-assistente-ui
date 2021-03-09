import * as api from '../api';
import authHeader from './auth-header';

class UserService {
  getPublicContent() {
    return api.get('all');
  }

  getUserBoard(){
    return api.get('user', { headers: authHeader() });
  }
}
