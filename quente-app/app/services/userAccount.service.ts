import {ApiResponse} from 'apisauce';
import {api} from './api';

class UserAccountService {
  constructor() {}

  async update(userAccount: any) {
    const userAccountObj = {...userAccount};
    const userAccountId = userAccountObj._id;
    delete userAccountObj._id;
    const response: ApiResponse<any> = await api.apisauce.put(
      `user-accounts/${userAccountId}`,
      {
        ...userAccountObj,
      },
    );
    return response;
  }
  async findAll (params: any){
    const response: ApiResponse<any> = await api.apisauce.get(
      `user-accounts`,
      params
    );
    return response;
  }
}

const userAccountService = new UserAccountService();
export default userAccountService;
