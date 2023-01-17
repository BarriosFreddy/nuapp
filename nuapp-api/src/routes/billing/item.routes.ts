import express from 'express';
import isAuthenticated from '../../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../../helpers/middleware/validation.middleware';

import { idSchema } from '../../helpers/validations/id.schema';
import itemController from '../../controllers/billing/item.controller';
/* import {
  RoleCreateSchema,
  RoleUpdateSchema,
} from '../helpers/validations/item.schema'; */
const router = express.Router();

router.post(
  '/',
  //validateBody(RoleCreateSchema),
  isAuthenticated,
  itemController.save,
);
router.put(
  '/:id',
  validateParameters(idSchema),
  //validateBody(RoleUpdateSchema),
  isAuthenticated,
  itemController.update,
);
router.get(
  '/:id',
  validateParameters(idSchema),
  isAuthenticated,
  itemController.findOne,
);
router.get('/', isAuthenticated, itemController.findAll);

export default router;
