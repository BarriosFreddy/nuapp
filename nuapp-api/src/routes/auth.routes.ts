import express from "express";
import authController from '../controllers/auth.controller';
import isAuthenticated from "../helpers/middleware/authenticate.middleware";
const router = express.Router();

router.post("/authenticate", authController.authenticate);
router.get("/logout", authController.logout);
router.get("/info-user", isAuthenticated, authController.infoUser);


export default router;
