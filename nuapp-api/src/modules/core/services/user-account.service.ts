import UserAccountModel, { UserAccount } from '../models/user-account.model';
import bcrypt from 'bcryptjs';
import { singleton } from 'tsyringe';
import { BaseService } from '../../../helpers/abstracts/base.service';

@singleton()
export class UserAccountService extends BaseService<UserAccount> {
  async findOne(id: string) {
    return await UserAccountModel.findById(id).exec();
  }
  async findAll() {
    const userAccounts = await UserAccountModel.find().exec();
    return userAccounts;
  }

  async save(userAccount: UserAccount): Promise<UserAccount> {
    try {
      if (!userAccount.password) return Promise.reject(null);
      const salt = await bcrypt.genSalt(10); // hash the password
      const hashedPassword = await bcrypt.hash(userAccount.password, salt);
      userAccount.password = hashedPassword;
      userAccount.createdAt = new Date();
      const userAccountSaved = await UserAccountModel.create(userAccount);
      return userAccountSaved;
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(id: string, userAccount: UserAccount): Promise<any> {
    try {
      delete userAccount.password;
      userAccount.updatedAt = new Date();
      const { modifiedCount } = await UserAccountModel.updateOne(
        { _id: id },
        userAccount,
      );
      return !!modifiedCount;
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async findByEmail(email: string): Promise<UserAccount | null> {
    try {
      return await UserAccountModel.findOne({ email });
    } catch (error) {
      return Promise.reject(null);
    }
  }
}
