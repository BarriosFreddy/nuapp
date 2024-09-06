import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import authService from '../services/auth.service';
import * as storage from '../utils/storage';
import {AUTH_TOKEN} from '../utils/constants';
import { LoginType } from '../shared/types';
import { UserAccountModel } from './UserAccontStore';

const SignUpModel = types.model('SignUpModel', {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
});

export const AuthenticationStoreModel = types
  .model('AuthenticationStore')
  .props({
    authToken: types.maybe(types.string),
    signUpObj: types.maybe(SignUpModel),
    userAccount: types.maybe(UserAccountModel),
  })
  .views(store => ({
    get isAuthenticated() {
      return !!store.authToken;
    },
    get validationError() {
      if (store.signUpObj?.email.length === 0) return "can't be blank";
      //if (store.signUpObj?.email.length < 6) return 'must be at least 6 characters';
      /* if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.signUpObj?.email))
        return 'must be a valid email address'; */
      return '';
    },
  }))
  .actions(store => ({
    setAuthToken(value?: string) {
      store.authToken = value;
    },
    setUserAccount(value?: UserAccount) {
      store.userAccount = value;
    },
    setSignUpObj(value?: any) {
      store.signUpObj = value;
    },
    async login(loginObj: LoginType) {
      try {
        const response = await authService.login(loginObj);
        if (response.ok) {
          const {access_token, ...user} = response.data as AuthResponse;
          await storage.save(AUTH_TOKEN, access_token);
          this.setAuthToken(access_token);
          this.setUserAccount({
            _id: user.id,
            firstName: user.name,
            roles: user.roles,
          } as UserAccount);
        }
        return response;
      } catch (e) {
        console.error(e);
      }
    },
    async signUp(signUpObj: any) {
      try {
        const response = await authService.signUp(signUpObj);
        if (response.ok) {
        }
        return response;
      } catch (e) {
        console.error(e);
      }
    },
    async logout() {
      await storage.remove(AUTH_TOKEN);
      this.setAuthToken(undefined);
    },
  }));

export interface UserAccount extends Instance<typeof UserAccountModel> {}
export interface AuthenticationStore
  extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot
  extends SnapshotOut<typeof AuthenticationStoreModel> {}


  export interface AuthResponse {
    roles:        string[];
    organization: Organization;
    id:           string;
    name:         string;
    access_token: string;
}

export interface Organization {
    id:       string;
    name:     string;
    tenantId: string;
}
