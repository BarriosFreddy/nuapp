import express from 'express';
import isAuthenticated from '../../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../../helpers/middleware/validation.middleware';

import { idSchema } from '../../helpers/schemas/id.schema';
import categoryController from '../../controllers/billing/category.controller';
import {
  CategoryCreateSchema,
  CategoryUpdateSchema,
} from '../../helpers/schemas/billing/category.schema';
import { roleValidation } from '../../helpers/middleware/role-validation.middleware';
import { generateAuthKeyPair } from '../../helpers/util';
import { ModuleCode } from '../../helpers/enums/modules-codes';
import { Privilege } from '../../helpers/enums/privileges';
const router = express.Router();

router.post(
  '/',
  validateBody(CategoryCreateSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.CREATE)),
  categoryController.save,
);
router.put(
  '/:id',
  validateParameters(idSchema),
  validateBody(CategoryUpdateSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.UPDATE)),
  categoryController.update,
);
router.get(
  '/:id',
  validateParameters(idSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.ACCESS)),
  categoryController.findOne,
);
router.get('/', isAuthenticated, categoryController.findAll);

export default router;
