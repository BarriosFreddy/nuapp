import express from 'express';
import isAuthenticated from '../../../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../../../helpers/middleware/validation.middleware';

import billingController from '../controllers/billing.controller';
import { roleValidation } from '../../../helpers/middleware/role-validation.middleware';
import { generateAuthKeyPair } from '../../../helpers/util';
import { ModuleCode } from '../../core/enums/modules-codes';
import { Privilege } from '../../core/enums/privileges';
import { idSchema } from '../../../helpers/db/schemas/id.schema';
import { BillingCreateSchema } from '../db/schemas/billing.schema';
const billingRouter = express.Router();

billingRouter.post(
  '/',
  validateBody(BillingCreateSchema),
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
billingRouter.get(
  '/per/:date',
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.ACCESS)),
  billingController.findGreaterThanDate,
);
billingRouter.get('/', isAuthenticated, billingController.findAll);

export default billingRouter;
