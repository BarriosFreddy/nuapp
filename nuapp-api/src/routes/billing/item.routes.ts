import express from 'express';
import isAuthenticated from '../../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../../helpers/middleware/validation.middleware';

import { idSchema } from '../../helpers/schemas/id.schema';
import itemController from '../../controllers/billing/item.controller';
import {
  ItemCreateSchema,
  ItemUpdateSchema,
} from '../../helpers/schemas/billing/item.schema';
import { roleValidation } from '../../helpers/middleware/role-validation.middleware';
import { generateAuthKeyPair } from '../../helpers/util';
import { ModuleCode } from '../../helpers/enums/modules-codes';
import { Privilege } from '../../helpers/enums/privileges';

const router = express.Router();

router.post(
  '/bulk',
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.CREATE)),
  itemController.saveAll,
);
router.post(
  '/',
  validateBody(ItemCreateSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.CREATE)),
  itemController.save,
);
router.put(
  '/:id',
  validateParameters(idSchema),
  validateBody(ItemUpdateSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.UPDATE)),
  itemController.update,
);
router.get(
  '/:id',
  validateParameters(idSchema),
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModuleCode.BILLING, Privilege.ACCESS)),
  itemController.findOne,
);
router.get('/', isAuthenticated, itemController.findAll);

export default router;
