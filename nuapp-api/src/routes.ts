import { Express, Request, Response } from 'express';
import * as coreRouter from './modules/core/routes/index';
import * as billingRouter from './modules/billing/routes/index';

export function registerRoutes(app: Express): void {
  app.get('/', (_req: Request, res: Response) => {
    res.send({
      appName: 'Nuapp',
      version: '0.0.1',
      description: 'Platform to support Micro-saas',
    });
  });
  app.use('/user-accounts', coreRouter.userAccountRouter);
  app.use('/roles', coreRouter.roleRouter);
  app.use('/auth', coreRouter.authRouter);
  app.use('/items', billingRouter.itemRouter);
  app.use('/item-categories', billingRouter.itemCategoryRouter);
  app.use('/billings', billingRouter.billingRouter);
  app.use('/enumerations', coreRouter.enumerationsRouter);
}