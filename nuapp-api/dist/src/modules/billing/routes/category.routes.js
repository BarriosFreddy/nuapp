"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_middleware_1 = __importDefault(require("../../../helpers/middleware/authenticate.middleware"));
const validation_middleware_1 = require("../../../helpers/middleware/validation.middleware");
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const category_schema_1 = require("../db/schemas/category.schema");
const role_validation_middleware_1 = require("../../../helpers/middleware/role-validation.middleware");
const util_1 = require("../../../helpers/util");
const modules_codes_1 = require("../../core/enums/modules-codes");
const privileges_1 = require("../../core/enums/privileges");
const id_schema_1 = require("../../../helpers/db/schemas/id.schema");
const itemCategoryRouter = express_1.default.Router();
itemCategoryRouter.post('/', (0, validation_middleware_1.validateBody)(category_schema_1.CategoryCreateSchema), authenticate_middleware_1.default, (0, role_validation_middleware_1.roleValidation)((0, util_1.generateAuthKeyPair)(modules_codes_1.ModuleCode.BILLING, privileges_1.Privilege.CREATE)), category_controller_1.default.save);
itemCategoryRouter.put('/:id', (0, validation_middleware_1.validateParameters)(id_schema_1.idSchema), (0, validation_middleware_1.validateBody)(category_schema_1.CategoryUpdateSchema), authenticate_middleware_1.default, (0, role_validation_middleware_1.roleValidation)((0, util_1.generateAuthKeyPair)(modules_codes_1.ModuleCode.BILLING, privileges_1.Privilege.UPDATE)), category_controller_1.default.update);
itemCategoryRouter.get('/:id', (0, validation_middleware_1.validateParameters)(id_schema_1.idSchema), authenticate_middleware_1.default, (0, role_validation_middleware_1.roleValidation)((0, util_1.generateAuthKeyPair)(modules_codes_1.ModuleCode.BILLING, privileges_1.Privilege.ACCESS)), category_controller_1.default.findOne);
itemCategoryRouter.get('/', authenticate_middleware_1.default, category_controller_1.default.findAll);
exports.default = itemCategoryRouter;
