"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_middleware_1 = __importDefault(require("../../../helpers/middleware/authenticate.middleware"));
const validation_middleware_1 = require("../../../helpers/middleware/validation.middleware");
const item_controller_1 = __importDefault(require("../controllers/item.controller"));
const item_schema_1 = require("../db/schemas/item.schema");
const role_validation_middleware_1 = require("../../../helpers/middleware/role-validation.middleware");
const util_1 = require("../../../helpers/util");
const modules_codes_1 = require("../../core/enums/modules-codes");
const privileges_1 = require("../../core/enums/privileges");
const id_schema_1 = require("../../../helpers/db/schemas/id.schema");
const itemRouter = express_1.default.Router();
itemRouter.post('/bulk', authenticate_middleware_1.default, (0, role_validation_middleware_1.roleValidation)((0, util_1.generateAuthKeyPair)(modules_codes_1.ModuleCode.BILLING, privileges_1.Privilege.CREATE)), item_controller_1.default.saveAll);
itemRouter.post('/', (0, validation_middleware_1.validateBody)(item_schema_1.ItemCreateSchema), authenticate_middleware_1.default, (0, role_validation_middleware_1.roleValidation)((0, util_1.generateAuthKeyPair)(modules_codes_1.ModuleCode.BILLING, privileges_1.Privilege.CREATE)), item_controller_1.default.save);
itemRouter.put('/:id', (0, validation_middleware_1.validateParameters)(id_schema_1.idSchema), (0, validation_middleware_1.validateBody)(item_schema_1.ItemUpdateSchema), authenticate_middleware_1.default, (0, role_validation_middleware_1.roleValidation)((0, util_1.generateAuthKeyPair)(modules_codes_1.ModuleCode.BILLING, privileges_1.Privilege.UPDATE)), item_controller_1.default.update);
itemRouter.get('/:id', (0, validation_middleware_1.validateParameters)(id_schema_1.idSchema), authenticate_middleware_1.default, (0, role_validation_middleware_1.roleValidation)((0, util_1.generateAuthKeyPair)(modules_codes_1.ModuleCode.BILLING, privileges_1.Privilege.ACCESS)), item_controller_1.default.findOne);
itemRouter.get('/', authenticate_middleware_1.default, item_controller_1.default.findAll);
exports.default = itemRouter;
