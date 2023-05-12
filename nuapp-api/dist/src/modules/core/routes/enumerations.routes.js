"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_middleware_1 = __importDefault(require("../../../helpers/middleware/authenticate.middleware"));
const validation_middleware_1 = require("../../../helpers/middleware/validation.middleware");
const enumerations_controller_1 = __importDefault(require("../controllers/enumerations.controller"));
const enumerations_schema_1 = require("../db/schemas/enumerations.schema");
const role_validation_middleware_1 = require("../../../helpers/middleware/role-validation.middleware");
const util_1 = require("../../../helpers/util");
const modules_codes_1 = require("../enums/modules-codes");
const privileges_1 = require("../enums/privileges");
const id_schema_1 = require("../../../helpers/db/schemas/id.schema");
const enumerationsRouter = express_1.default.Router();
enumerationsRouter.post('/', (0, validation_middleware_1.validateBody)(enumerations_schema_1.EnumerationCreateSchema), authenticate_middleware_1.default, (0, role_validation_middleware_1.roleValidation)((0, util_1.generateAuthKeyPair)(modules_codes_1.ModuleCode.BILLING, privileges_1.Privilege.CREATE)), enumerations_controller_1.default.save);
enumerationsRouter.put('/:id', (0, validation_middleware_1.validateParameters)(id_schema_1.idSchema), (0, validation_middleware_1.validateBody)(enumerations_schema_1.EnumerationUpdateSchema), authenticate_middleware_1.default, (0, role_validation_middleware_1.roleValidation)((0, util_1.generateAuthKeyPair)(modules_codes_1.ModuleCode.BILLING, privileges_1.Privilege.UPDATE)), enumerations_controller_1.default.update);
enumerationsRouter.get('/:id', (0, validation_middleware_1.validateParameters)(id_schema_1.idSchema), authenticate_middleware_1.default, (0, role_validation_middleware_1.roleValidation)((0, util_1.generateAuthKeyPair)(modules_codes_1.ModuleCode.BILLING, privileges_1.Privilege.ACCESS)), enumerations_controller_1.default.findOne);
enumerationsRouter.get('/', authenticate_middleware_1.default, enumerations_controller_1.default.findAll);
exports.default = enumerationsRouter;
