"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumerationsRouter = exports.userAccountRouter = exports.authRouter = exports.roleRouter = void 0;
const role_routes_1 = __importDefault(require("./role.routes"));
exports.roleRouter = role_routes_1.default;
const auth_routes_1 = __importDefault(require("./auth.routes"));
exports.authRouter = auth_routes_1.default;
const user_account_routes_1 = __importDefault(require("./user-account.routes"));
exports.userAccountRouter = user_account_routes_1.default;
const enumerations_routes_1 = __importDefault(require("./enumerations.routes"));
exports.enumerationsRouter = enumerations_routes_1.default;
