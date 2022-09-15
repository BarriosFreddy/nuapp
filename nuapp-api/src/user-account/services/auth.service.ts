import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { FindManyOptions, Repository } from 'typeorm';
import { UserService } from './user.service';
import { Payload } from '../../core/security/payload.interface';
import { UserDTO } from '../dtos/user.dto';
import { UserLoginDTO } from '../dtos/user-login.dto';
import { Authority } from '../../core/authority.entity';

@Injectable()
export class AuthService {
  logger = new Logger('AuthService');
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Authority)
    private authorityRepository: Repository<Authority>,
    private userService: UserService,
  ) {}

  async login(userLogin: UserLoginDTO): Promise<any> {
    const loginUserName = userLogin.username;
    const loginPassword = userLogin.password;

    const userFind = await this.userService.findByFields({
      where: { login: loginUserName },
    });
    console.log({ userFind });
    const validPassword =
      !!userFind && (await bcrypt.compare(loginPassword, userFind.password));
    if (!userFind || !validPassword) {
      throw new HttpException(
        'Invalid login name or password!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userFind && !userFind.activated) {
      throw new HttpException(
        'Your account is not been activated!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: Payload = {
      id: userFind.id,
      username: userFind.login,
      authorities: userFind.authorities,
    };

    /* eslint-disable */
    return {
      id_token: this.jwtService.sign(payload),
    };
  }

  /* eslint-enable */
  async validateUser(payload: Payload): Promise<UserDTO | undefined> {
    return await this.findUserWithAuthById(payload.id);
  }

  async findUserWithAuthById(userId: string): Promise<UserDTO | undefined> {
    const userDTO: UserDTO = await this.userService.findById(userId);
    return userDTO;
  }

  async getAccount(userId: string): Promise<UserDTO | undefined> {
    const userDTO: UserDTO = await this.findUserWithAuthById(userId);
    if (!userDTO) {
      return;
    }
    return userDTO;
  }

  async changePassword(
    userLogin: string,
    currentClearTextPassword: string,
    newPassword: string,
  ): Promise<void> {
    const userFind: UserDTO = await this.userService.findByFields({
      where: { login: userLogin },
    });
    if (!userFind) {
      throw new HttpException('Invalid login name!', HttpStatus.BAD_REQUEST);
    }

    if (!(await bcrypt.compare(currentClearTextPassword, userFind.password))) {
      throw new HttpException('Invalid password!', HttpStatus.BAD_REQUEST);
    }
    userFind.password = newPassword;
    await this.userService.save(userFind, userLogin, true);
    return;
  }

  async registerNewUser(newUser: UserDTO): Promise<UserDTO> {
    let userFind: UserDTO = await this.userService.findByFields({
      where: { login: newUser.login },
    });
    if (userFind) {
      throw new HttpException(
        'Login name already used!',
        HttpStatus.BAD_REQUEST,
      );
    }
    userFind = await this.userService.findByFields({
      where: { email: newUser.email },
    });
    if (userFind) {
      throw new HttpException(
        'Email is already in use!',
        HttpStatus.BAD_REQUEST,
      );
    }
    newUser.authorities = ['ROLE_USER'];
    const user: UserDTO = await this.userService.save(
      newUser,
      newUser.login,
      true,
    );
    return user;
  }

  async updateUserSettings(
    userLogin: string,
    newUserInfo: UserDTO,
  ): Promise<UserDTO> {
    const userFind: UserDTO = await this.userService.findByFields({
      where: { login: userLogin },
    });
    if (!userFind) {
      throw new HttpException('Invalid login name!', HttpStatus.BAD_REQUEST);
    }
    const userFindEmail: UserDTO = await this.userService.findByFields({
      where: { email: newUserInfo.email },
    });
    if (userFindEmail && newUserInfo.email !== userFind.email) {
      throw new HttpException(
        'Email is already in use!',
        HttpStatus.BAD_REQUEST,
      );
    }

    userFind.firstName = newUserInfo.firstName;
    userFind.lastName = newUserInfo.lastName;
    userFind.email = newUserInfo.email;
    userFind.langKey = newUserInfo.langKey;
    await this.userService.save(userFind, userLogin);
    return;
  }

  async getAllUsers(
    options: FindManyOptions<UserDTO>,
  ): Promise<[UserDTO[], number]> {
    return await this.userService.findAndCount(options);
  }
}
