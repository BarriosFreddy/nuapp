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
const user_account_service_1 = require("../services/user-account.service");
const tsyringe_1 = require("tsyringe");
const userAccountService = tsyringe_1.container.resolve(user_account_service_1.UserAccountService);
class UserAccountsController {
    findAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAccounts = yield userAccountService.findAll();
            res.status(200).send(userAccounts);
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userAccount = yield userAccountService.findOne(id);
            res.status(200).send(userAccount);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAccount = req.body;
            const userAccountSaved = yield userAccountService.save(userAccount);
            res.status(201).send(userAccountSaved);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userAccount = req.body;
            const userAccountSaved = yield userAccountService.update(id, userAccount);
            userAccountSaved
                ? res.status(201).send(userAccountSaved)
                : res.status(400).send("Something went wrong");
        });
    }
}
const userAccountController = new UserAccountsController();
exports.default = userAccountController;
