import express from 'express';
import isAuthenticated from '../../../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../../../helpers/middleware/validation.middleware';

import categoryController from '../controllers/category.controller';
import {
  CategoryCreateSchema,
  CategoryUpdateSchema,
} from '../db/schemas/category.schema';
import { roleValidation } from '../../../helpers/middleware/role-validation.middleware';
import { generateAuthKeyPair } from '../../../helpers/util';
import { ModuleCode } from '../../core/enums/modules-codes';
import { Privilege } from '../../core/enums/privileges';
import { idSchema } from '../../../helpers/db/schemas/id.schema';
const itemCategoryRouter = express.Router();

itemCategoryRouter.post(
  '/',
  validateBody(CategoryCreateSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.CREATE)),
  categoryController.save,
);
itemCategoryRouter.put(
  '/:id',
  validateParameters(idSchema),
  validateBody(CategoryUpdateSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.UPDATE)),
  categoryController.update,
);
itemCategoryRouter.get(
  '/:id',
  validateParameters(idSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.ACCESS)),
  categoryController.findOne,
);
itemCategoryRouter.get('/', isAuthenticated, categoryController.findAll);

export default itemCategoryRouter;
