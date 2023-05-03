import express from 'express';
import isAuthenticated from '../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../helpers/middleware/validation.middleware';

import { idSchema } from '../helpers/schemas/id.schema';
import roleController from '../controllers/roles.controller';
import {
  RoleCreateSchema,
  RoleUpdateSchema,
} from '../helpers/schemas/roles.schema';
import { generateAuthKeyPair } from '../helpers/util';
import { ModuleCode } from '../helpers/enums/modules-codes';
import { Privilege } from '../helpers/enums/privileges';
import { roleValidation } from '../helpers/middleware/role-validation.middleware';

const router = express.Router();

router.post(
  '/',
  validateBody(RoleCreateSchema),
  isAuthenticated,
  roleValidation(
    generateAuthKeyPair(ModuleCode.USER_ACCOUNT, Privilege.CREATE),
  ),
  roleController.save,
);
router.put(
  '/:id',
  validateParameters(idSchema),
  validateBody(RoleUpdateSchema),
  isAuthenticated,
  roleValidation(
    generateAuthKeyPair(ModuleCode.USER_ACCOUNT, Privilege.UPDATE),
  ),
  roleController.update,
);
router.get(
  '/:id',
  validateParameters(idSchema),
  isAuthenticated,
  roleValidation(
    generateAuthKeyPair(ModuleCode.USER_ACCOUNT, Privilege.ACCESS),
  ),
  roleController.findOne,
);
router.get('/', isAuthenticated, roleController.findAll);

export default router;
