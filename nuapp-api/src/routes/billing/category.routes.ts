import express from 'express';
import isAuthenticated from '../../helpers/middleware/authenticate.middleware';
import {
  validateBody,
  validateParameters,
} from '../../helpers/middleware/validation.middleware';

import { idSchema } from '../../helpers/schemas/id.schema';
import categoryController from '../../controllers/billing/category.controller';
import {
  CategoryCreateSchema,
  CategoryUpdateSchema,
} from '../../helpers/schemas/billing/category.schema';
const router = express.Router();

router.post(
  '/',
  validateBody(CategoryCreateSchema),
  isAuthenticated,
  categoryController.save,
);
router.put(
  '/:id',
  validateParameters(idSchema),
  validateBody(CategoryUpdateSchema),
  isAuthenticated,
  categoryController.update,
);
router.get(
  '/:id',
  validateParameters(idSchema),
  isAuthenticated,
  categoryController.findOne,
);
router.get('/', isAuthenticated, categoryController.findAll);

export default router;
