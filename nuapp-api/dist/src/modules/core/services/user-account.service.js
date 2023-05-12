"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UserAccountService = void 0;
const user_account_model_1 = __importDefault(require("../models/user-account.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tsyringe_1 = require("tsyringe");
const base_service_1 = require("../../../helpers/abstracts/base.service");
let UserAccountService = class UserAccountService extends base_service_1.BaseService {
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_account_model_1.default.findById(id).exec();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const userAccounts = yield user_account_model_1.default.find().exec();
            return userAccounts;
        });
    }
    save(userAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userAccount.password)
                    return Promise.reject(null);
                const salt = yield bcryptjs_1.default.genSalt(10); // hash the password
                const hashedPassword = yield bcryptjs_1.default.hash(userAccount.password, salt);
                userAccount.password = hashedPassword;
                userAccount.createdAt = new Date();
                const userAccountSaved = yield user_account_model_1.default.create(userAccount);
                return userAccountSaved;
            }
            catch (error) {
                console.log(error);
                return Promise.reject(null);
            }
        });
    }
    update(id, userAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete userAccount.password;
                userAccount.updatedAt = new Date();
                const { modifiedCount } = yield user_account_model_1.default.updateOne({ _id: id }, userAccount);
                return !!modifiedCount;
            }
            catch (error) {
                console.log(error);
                return Promise.reject(null);
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_account_model_1.default.findOne({ email });
            }
            catch (error) {
                return Promise.reject(null);
            }
        });
    }
};
UserAccountService = __decorate([
    (0, tsyringe_1.singleton)()
], UserAccountService);
exports.UserAccountService = UserAccountService;
