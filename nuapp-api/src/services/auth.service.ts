import { singleton } from "tsyringe";
import { UserAccountLogin } from "../helpers/types/user-account-login.type";
import { UserAccount } from "../models/user-accounts.model";
import { UserAccountService } from "./user-account.service";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
const { SECRET_KEY } = process.env;

@singleton()
export class AuthService {
  constructor(public userAccountService: UserAccountService) {}

  async authenticate(userAccountLogin: UserAccountLogin) {
    const { email, password } = userAccountLogin;
    const userAccount: UserAccount | null =
      await this.userAccountService.findByEmail(email);
    if (!userAccount) return null;
    const isTheSame = await bcrypt.compare(
      password,
      userAccount.password || ""
    );
    if (!isTheSame) return null;
    const data = {
      _id: userAccount._id,
      email: userAccount.email,
    };
    const token = this.generateToken(data);
    return {
      token,
    };
  }

  private generateToken(data: {}): string {
    if (!SECRET_KEY) throw new Error("Secret key has not been set");
    const token = jsonwebtoken.sign(
      {
        data,
      },
      SECRET_KEY
    );
    return token;
  }
}