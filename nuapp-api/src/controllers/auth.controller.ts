import { UserAccountLogin } from "../helpers/types/user-account-login.type";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthService } from "../services/auth.service";

const authService = container.resolve(AuthService);

class AuthController {
  async authenticate(req: Request, res: Response) {
    const userAccountLogin: UserAccountLogin = req.body;
    const authenticated = await authService.authenticate(userAccountLogin);
    if (authenticated) {
      res.status(200).send(authenticated);
    } else {
      res.status(403).send({ message: "credentials invalid"});
    }
  }
}

const authController = new AuthController();
export default authController;
