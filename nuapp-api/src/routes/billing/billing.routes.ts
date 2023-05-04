import express from 'express';
import isAuthenticated from '../../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../../helpers/middleware/validation.middleware';

import { idSchema } from '../../helpers/schemas/id.schema';
import billingController from '../../controllers/billing/billing.controller';
import {
  BillCreateSchema,
  BillUpdateSchema,
} from '../../helpers/schemas/billing/billing.schema';
import { roleValidation } from '../../helpers/middleware/role-validation.middleware';
import { generateAuthKeyPair } from '../../helpers/util';
import { ModuleCode } from '../../helpers/enums/modules-codes';
import { Privilege } from '../../helpers/enums/privileges';
const router = express.Router();

router.post(
  '/',
  validateBody(BillCreateSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.CREATE)),
  billingController.save,
);
router.put(
  '/:id',
  validateParameters(idSchema),
  validateBody(BillUpdateSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.UPDATE)),
  billingController.update,
);
router.get(
  '/:id',
  validateParameters(idSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.ACCESS)),
  billingController.findOne,
);
router.get('/', isAuthenticated, billingController.findAll);

export default router;
