import express from 'express';
import isAuthenticated from '../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../helpers/middleware/validation.middleware';

import { idSchema } from '../helpers/schemas/id.schema';
import enumerationsController from '../controllers/enumerations.controller';
import {
  EnumerationCreateSchema,
  EnumerationUpdateSchema,
} from '../helpers/schemas/enumerations.schema';
import { roleValidation } from '../helpers/middleware/role-validation.middleware';
import { generateAuthKeyPair } from '../helpers/util';
import { ModuleCode } from '../helpers/enums/modules-codes';
import { Privilege } from '../helpers/enums/privileges';
const router = express.Router();

router.post(
  '/',
  validateBody(EnumerationCreateSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.CREATE)),
  enumerationsController.save,
);
router.put(
  '/:id',
  validateParameters(idSchema),
  validateBody(EnumerationUpdateSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.UPDATE)),
  enumerationsController.update,
);
router.get(
  '/:id',
  validateParameters(idSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.ACCESS)),
  enumerationsController.findOne,
);

router.get('/', isAuthenticated, enumerationsController.findAll);

export default router;
