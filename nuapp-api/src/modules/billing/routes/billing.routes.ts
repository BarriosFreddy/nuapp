import express from 'express';
import isAuthenticated from '../../../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../../../helpers/middleware/validation.middleware';

import billingController from '../controllers/billing.controller';
import {
  BillCreateSchema,
  BillUpdateSchema,
} from '../db/schemas/billing.schema';
import { roleValidation } from '../../../helpers/middleware/role-validation.middleware';
import { generateAuthKeyPair } from '../../../helpers/util';
import { ModuleCode } from '../../core/enums/modules-codes';
import { Privilege } from '../../core/enums/privileges';
import { idSchema } from '../../../helpers/db/schemas/id.schema';
const billingRouter = express.Router();

billingRouter.post(
  '/',
  validateBody(BillCreateSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.CREATE)),
  billingController.save,
);
billingRouter.get(
  '/:id',
  validateParameters(idSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.ACCESS)),
  billingController.findOne,
);
billingRouter.get('/', isAuthenticated, billingController.findAll);

export default billingRouter;
