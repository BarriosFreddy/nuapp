import { UserAccountLogin } from '../types/user-account-login.type';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthService } from '../services/auth.service';

const { NODE_ENV = 'development' } = process.env;

const authService = container.resolve(AuthService);

class AuthController {
  async authenticate(req: Request, res: Response) {
    const userAccountLogin: UserAccountLogin = req.body;
    const access_token = await authService.authenticate(userAccountLogin);
    if (!access_token)
      return res.status(403).send({ message: 'credentials invalid' });

    return res
      .status(200)
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'none',
      })
      .send({
        message: 'Authenticated successfully',
      });
  }

  async logout(_req: Request, res: Response) {
    return res
      .status(200)
      .clearCookie('access_token')
      .send({ message: 'Logged out successfully' });
  }

  async infoUser(_req: Request, res: Response) {
    const { infoUser } = res.locals;
    return res.status(200).send(infoUser);
  }
}

const authController = new AuthController();
export default authController;
