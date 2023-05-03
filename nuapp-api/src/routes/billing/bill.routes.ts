import express from 'express';
import isAuthenticated from '../../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../../helpers/middleware/validation.middleware';

import { idSchema } from '../../helpers/schemas/id.schema';
import billController from '../../controllers/billing/bill.controller';
import {
  BillCreateSchema,
  BillUpdateSchema,
} from '../../helpers/schemas/billing/bill.schema';
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
  billController.save,
);
router.put(
  '/:id',
  validateParameters(idSchema),
  validateBody(BillUpdateSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.UPDATE)),
  billController.update,
);
router.get(
  '/:id',
  validateParameters(idSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.ACCESS)),
  billController.findOne,
);
router.get('/', isAuthenticated, billController.findAll);

export default router;
