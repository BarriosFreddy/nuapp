"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tsyringe_1 = require("tsyringe");
const user_account_service_1 = require("./user-account.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET_KEY } = process.env;
let AuthService = class AuthService {
    constructor(userAccountService) {
        this.userAccountService = userAccountService;
    }
    authenticate(userAccountLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = userAccountLogin;
            const userAccount = yield this.userAccountService.findByEmail(email);
            if (!userAccount)
                return null;
            const isTheSame = yield bcryptjs_1.default.compare(password, userAccount.password || '');
            if (!isTheSame)
                return null;
            const data = {
                _id: userAccount._id,
                roles: userAccount.roles,
            };
            const access_token = this.generateToken(data);
            return { access_token, data };
        });
    }
    generateToken(data) {
        if (!SECRET_KEY)
            throw new Error('Secret key has not been set');
        const token = jsonwebtoken_1.default.sign({
            data,
        }, SECRET_KEY);
        return token;
    }
};
AuthService = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [user_account_service_1.UserAccountService])
], AuthService);
exports.AuthService = AuthService;
