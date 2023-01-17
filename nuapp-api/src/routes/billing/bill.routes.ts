import express from 'express';
import isAuthenticated from '../../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../../helpers/middleware/validation.middleware';

import { idSchema } from '../../helpers/validations/id.schema';
import billController from '../../controllers/billing/bill.controller';
import {
  BillCreateSchema,
  BillUpdateSchema,
} from '../../helpers/validations/billing/bill.schema';
const router = express.Router();

router.post(
  '/',
  validateBody(BillCreateSchema),
  isAuthenticated,
  billController.save,
);
router.put(
  '/:id',
  validateParameters(idSchema),
  validateBody(BillUpdateSchema),
  isAuthenticated,
  billController.update,
);
router.get(
  '/:id',
  validateParameters(idSchema),
  isAuthenticated,
  billController.findOne,
);
router.get('/', isAuthenticated, billController.findAll);

export default router;
