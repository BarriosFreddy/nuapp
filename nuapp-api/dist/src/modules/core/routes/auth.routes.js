"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authenticate_middleware_1 = __importDefault(require("../../../helpers/middleware/authenticate.middleware"));
const authRouter = express_1.default.Router();
authRouter.post('/authenticate', auth_controller_1.default.authenticate);
authRouter.get('/logout', auth_controller_1.default.logout);
authRouter.get('/info-user', authenticate_middleware_1.default, auth_controller_1.default.infoUser);
exports.default = authRouter;
