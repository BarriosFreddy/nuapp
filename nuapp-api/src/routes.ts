import express, { Express, Request, Response } from 'express';
import * as coreRouter from './modules/core/routes/index';
import * as billingRouter from './modules/billing/routes/index';
import * as inventoryRouter from './modules/inventory/routes/index';

export function registerRoutes(app: Express): void {
  const apiRouter = express.Router();
  apiRouter.get('/', (_req: Request, res: Response) => {
    res.send({
      appName: 'Nuapp',
      version: '0.0.1',
      description: 'Platform to support Micro-saas',
    });
  });
  apiRouter.use('/user-accounts', coreRouter.userAccountRouter);
  apiRouter.use('/roles', coreRouter.roleRouter);
  apiRouter.use('/auth', coreRouter.authRouter);
  apiRouter.use('/enumerations', coreRouter.enumerationsRouter);
  apiRouter.use('/billings', billingRouter.billingRouter);
  apiRouter.use('/items', inventoryRouter.itemRouter);
  apiRouter.use('/item-categories', inventoryRouter.itemCategoryRouter);
  apiRouter.use('/kardex', inventoryRouter.kardexTransactionRouter);

  app.use('/api/v1', apiRouter);
}
