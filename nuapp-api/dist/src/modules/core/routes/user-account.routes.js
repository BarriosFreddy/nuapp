"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_accounts_controller_1 = __importDefault(require("../controllers/user-accounts.controller"));
const authenticate_middleware_1 = __importDefault(require("./../../../helpers/middleware/authenticate.middleware"));
const validation_middleware_1 = require("../../../helpers/middleware/validation.middleware");
const user_accounts_schema_1 = require("../db/schemas/user-accounts.schema");
const id_schema_1 = require("../../../helpers/db/schemas/id.schema");
const role_validation_middleware_1 = require("../../../helpers/middleware/role-validation.middleware");
const modules_codes_1 = require("../enums/modules-codes");
const privileges_1 = require("../enums/privileges");
const index_1 = require("../../../helpers/util/index");
const userAccountRouter = express_1.default.Router();
userAccountRouter.post('/', (0, validation_middleware_1.validateBody)(user_accounts_schema_1.UserAccountCreateSchema), 
//isAuthenticated,
user_accounts_controller_1.default.save);
userAccountRouter.put('/:id', (0, validation_middleware_1.validateParameters)(id_schema_1.idSchema), (0, validation_middleware_1.validateBody)(user_accounts_schema_1.UserAccountUpdateSchema), authenticate_middleware_1.default, (0, role_validation_middleware_1.roleValidation)((0, index_1.generateAuthKeyPair)(modules_codes_1.ModuleCode.USER_ACCOUNT, privileges_1.Privilege.UPDATE)), user_accounts_controller_1.default.update);
userAccountRouter.get('/:id', (0, validation_middleware_1.validateParameters)(id_schema_1.idSchema), authenticate_middleware_1.default, (0, role_validation_middleware_1.roleValidation)((0, index_1.generateAuthKeyPair)(modules_codes_1.ModuleCode.USER_ACCOUNT, privileges_1.Privilege.ACCESS)), user_accounts_controller_1.default.findOne);
userAccountRouter.get('/', authenticate_middleware_1.default, (0, role_validation_middleware_1.roleValidation)((0, index_1.generateAuthKeyPair)(modules_codes_1.ModuleCode.USER_ACCOUNT, privileges_1.Privilege.ACCESS)), user_accounts_controller_1.default.findAll);
exports.default = userAccountRouter;
