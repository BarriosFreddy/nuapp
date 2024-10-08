import {ApiResponse} from 'apisauce';
import {api} from './api';
import {encode} from 'base-64';
import {LoginType} from '../shared/types';

class AuthService {
  constructor() {}

  async login(loginObj: LoginType) {
/*     const credentialsB64 = encode(
      `${loginObj.phoneNumber}:${loginObj.password}`,
    ); */

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
