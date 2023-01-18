import express from 'express';
import userAccountController from '../controllers/user-accounts.controller';
import isAuthenticated from './../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../helpers/middleware/validation.middleware';
import {
  UserAccountCreateSchema,
  UserAccountUpdateSchema,
} from '../helpers/schemas/user-accounts.schema';
import { idSchema } from '../helpers/schemas/id.schema';
import { roleValidation } from '../helpers/middleware/role-validation.middleware';
import { ModulesCode } from '../helpers/enums/modules-codes';
import { Privilege } from '../helpers/enums/privileges';
import { generateAuthKeyPair } from '../helpers/util/index';
const router = express.Router();

router.post(
  '/',
  validateBody(UserAccountCreateSchema),
  //isAuthenticated,
  userAccountController.save,
);
router.put(
  '/:id',
  validateParameters(idSchema),
  validateBody(UserAccountUpdateSchema),
  isAuthenticated,
  roleValidation(
    generateAuthKeyPair(ModulesCode.USER_ACCOUNT, Privilege.UPDATE),
  ),
  userAccountController.update,
);
router.get(
  '/:id',
  validateParameters(idSchema),
  isAuthenticated,
  userAccountController.findOne,
);
router.get(
  '/',
  isAuthenticated,
  roleValidation(generateAuthKeyPair(ModulesCode.USER_ACCOUNT, Privilege.ACCESS)),
  userAccountController.findAll,
);

export default router;
