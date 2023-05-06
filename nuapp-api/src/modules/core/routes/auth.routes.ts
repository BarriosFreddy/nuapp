import express from 'express';
import authController from '../controllers/auth.controller';
import isAuthenticated from '../../../helpers/middleware/authenticate.middleware';
const authRouter = express.Router();

authRouter.post('/authenticate', authController.authenticate);
authRouter.get('/logout', authController.logout);
authRouter.get('/info-user', isAuthenticated, authController.infoUser);

export default authRouter;
