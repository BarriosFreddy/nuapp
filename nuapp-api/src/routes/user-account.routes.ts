import express from "express";
import userAccountController from "../controllers/user-accounts.controller";
import isAuthenticated from "./../helpers/middleware/authenticate.middleware";
import {
  validateBody,
  validateParameters,
} from "../helpers/middleware/validation.middleware";
import {
  UserAccountCreateSchema,
  UserAccountUpdateSchema,
} from "../helpers/validations/user-accounts.schema";
import { idSchema } from "../helpers/validations/id.schema";
const router = express.Router();

router.post(
  "/",
  validateBody(UserAccountCreateSchema),
  //isAuthenticated,
  userAccountController.save
);
router.put(
  "/:id",
  validateParameters(idSchema),
  validateBody(UserAccountUpdateSchema),
  isAuthenticated,
  userAccountController.update
);
router.get(
  "/:id",
  validateParameters(idSchema),
  isAuthenticated,
  userAccountController.findOne
);
router.get("/", isAuthenticated, userAccountController.findAll);

export default router;
