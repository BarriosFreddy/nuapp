import { singleton } from 'tsyringe';
import { UserAccountLogin } from '../types/user-account-login.type';
import { UserAccountService } from './user-account.service';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { UserAccount } from '../entities/UserAccount';
const { SECRET_KEY, AUTH_DATABASE = '' } = process.env;

@singleton()
export class AuthService {
  constructor(public userAccountService: UserAccountService) {}

  async authenticate(
    userAccountLogin: UserAccountLogin,
  ): Promise<{ access_token: string; data: object } | null> {
    this.userAccountService.setTenantId = AUTH_DATABASE;
    const { email, password } = userAccountLogin;
    const userAccount: UserAccount | null =
      await this.userAccountService.findByEmail(email);
    if (!userAccount) return null;
    const isTheSame = await bcrypt.compare(
      password,
      userAccount.password || '',
    );
    const { organization } = userAccount;
    if (!isTheSame) return null;
    const data = {
      roles: userAccount.roles,
      organization,
    };
    const access_token = this.generateToken(data);
    return { access_token, data };
  }

  private generateToken(data: {}): string {
    if (!SECRET_KEY) throw new Error('Secret key has not been set');
    const token = jsonwebtoken.sign(
      {
        data,
      },
      SECRET_KEY,
    );
    return token;
  }

  async initOrg(_dbName: string) {
    throw new Error('Not implemented yet');
  }
}
