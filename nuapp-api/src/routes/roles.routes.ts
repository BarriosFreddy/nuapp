import express from 'express';
import isAuthenticated from '../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../helpers/middleware/validation.middleware';

import { idSchema } from '../helpers/validations/id.schema';
import roleController from '../controllers/roles.controller';
import {
  RoleCreateSchema,
  RoleUpdateSchema,
} from '../helpers/validations/roles.schema';
const router = express.Router();

router.post(
  '/',
  validateBody(RoleCreateSchema),
  isAuthenticated,
  roleController.save,
);
router.put(
  '/:id',
  validateParameters(idSchema),
  validateBody(RoleUpdateSchema),
  isAuthenticated,
  roleController.update,
);
router.get(
  '/:id',
  validateParameters(idSchema),
  isAuthenticated,
  roleController.findOne,
);
router.get('/', isAuthenticated, roleController.findAll);

export default router;
