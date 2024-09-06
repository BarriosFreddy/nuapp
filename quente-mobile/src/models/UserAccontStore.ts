import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import userAccountService from '../services/userAccount.service';

const VehicleModel = types.model('VehicleModel', {
  _id: '',
  model: '',
  brand: '',
  licensePlate: '',
  color: '',
  type: '',
});

const CheckCommentsModel = types.model('CheckCommentsModel', {
  _id: '',
  adminID: '',
  adminName: '',
  comments: '',
});

export const UserAccountModel = types
  .model('UserAccountStore')
  .props({
    _id: '',
    firstName: '',
    lastName: '',
    roles: types.array(types.string),
    phoneNumber: '',
    email: '',
    dni: '',
    status: '',
    vehicles: types.array(VehicleModel),
    checkComments: types.array(CheckCommentsModel),
  })
  .views(store => ({}))
  .actions(store => ({
    async update(userAccount: UserAccount) {
      try {
        const response = await userAccountService.update(userAccount);
        return response;
      } catch (e) {
        console.error(e);
      }
    },
    async findAll(params: any) {
      try {
        const response = await userAccountService.findAll(params);
        return response;
      } catch (e) {
        console.error(e);
      }
    },
  }));

export interface UserAccount extends Instance<typeof UserAccountModel> {}
export interface UserAccountStore
  extends Instance<typeof UserAccountModel> {}
export interface UserAccountStoreSnapshot
  extends SnapshotOut<typeof UserAccountModel> {}
