"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const auth_service_1 = require("../services/auth.service");
const { NODE_ENV = 'development' } = process.env;
const authService = tsyringe_1.container.resolve(auth_service_1.AuthService);
class AuthController {
    authenticate(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userAccountLogin = req.body;
            const { access_token = null, data } = (_a = (yield authService.authenticate(userAccountLogin))) !== null && _a !== void 0 ? _a : {};
            if (!access_token)
                return res.status(403).send({ message: 'credentials invalid' });
            return res
                .status(200)
                .cookie('access_token', access_token, {
                httpOnly: true,
                secure: NODE_ENV === 'production',
                sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
            })
                .send(data);
        });
    }
    logout(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.locals.infoUser = null;
            return res
                .status(200)
                .clearCookie('access_token', {
                httpOnly: true,
                secure: NODE_ENV === 'production',
                sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
            })
                .send({ message: 'Logged out successfully' });
        });
    }
    infoUser(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { infoUser } = res.locals;
            if (infoUser) {
                res.status(200).send(infoUser);
            }
            else {
                res.status(403).send(null);
            }
        });
    }
}
const authController = new AuthController();
exports.default = authController;
