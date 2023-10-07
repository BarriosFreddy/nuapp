import express from 'express';
import isAuthenticated from '../../../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../../../helpers/middleware/validation.middleware';

import organizationController from './controllers/organizations.controller';
import { generateAuthKeyPair } from '../../../helpers/util';
import { ModuleCode } from '../entities/enums/modules-codes';
import { Privilege } from '../entities/enums/privileges';
import { idSchema } from '../../../helpers/db/schemas/id.schema';
import {
  OrganizationCreateSchema,
  OrganizationUpdateSchema,
} from './validations/organizations.schema';
import { roleValidation } from '../../../helpers/middleware/role-validation.middleware';

const organizationRouter = express.Router();

organizationRouter.post(
  '/',
  validateBody(OrganizationCreateSchema),
  isAuthenticated,
  roleValidation(
    generateAuthKeyPair(ModuleCode.USER_ACCOUNT, Privilege.CREATE),
  ),
  organizationController.save,
);
organizationRouter.put(
  '/:id',
  validateParameters(idSchema),
  validateBody(OrganizationUpdateSchema),
  isAuthenticated,
  roleValidation(
    generateAuthKeyPair(ModuleCode.USER_ACCOUNT, Privilege.UPDATE),
  ),
  organizationController.update,
);
organizationRouter.get(
  '/:id',
  validateParameters(idSchema),
  isAuthenticated,
  roleValidation(
    generateAuthKeyPair(ModuleCode.USER_ACCOUNT, Privilege.ACCESS),
  ),
  organizationController.findOne,
);
organizationRouter.get('/', isAuthenticated, organizationController.findAll);

export default organizationRouter;
