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

const router = express.Router();

router.post(
  '/',
  validateBody(ItemCreateSchema),
  isAuthenticated,
  itemController.save,
);
router.put(
  '/:id',
  validateParameters(idSchema),
  validateBody(ItemUpdateSchema),
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
