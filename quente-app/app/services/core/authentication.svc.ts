import {ApiResponse} from 'apisauce';
import {api} from './../api';
import { LoginDTO } from '@/shared/dto/LoginDTO';

class AuthService {
  constructor() {}

  async login(loginObj: LoginDTO) {

    const response: ApiResponse<any> = await api.apisauce.post(
      `auth/authenticate`,
      loginObj,
    );

    return response;
  }
  async signUp(signUpObj: any) {
    const response: ApiResponse<any> = await api.apisauce.post(
      `user-accounts/`,
      {
        ...signUpObj,
        roles: ['ROLE_PASSENGER'],
      },
    );
    return response;
  }
}

const authService = new AuthService();
export default authService;
