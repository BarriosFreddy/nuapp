import { Express, Request, Response } from 'express';
import useraccountRouter from './user-account.routes';
import authRouter from './auth.routes';
import rolesRouter from './role.routes';
import categoryRouter from './billing/category.routes';
import itemRouter from './billing/item.routes';
import billRouter from './billing/bill.routes';
import enumerationRouter from './enumerations.routes';

export function registerRoutes(app: Express): void {
  app.get('/', (_req: Request, res: Response) => {
    res.send({
      appName: 'Nuapp',
      version: '0.0.1',
      description: 'Platform to support Micro-saas',
    });
  });
  app.use('/user-accounts', useraccountRouter);
  app.use('/roles', rolesRouter);
  app.use('/auth', authRouter);
  app.use('/categories', categoryRouter);
  app.use('/items', itemRouter);
  app.use('/billings', billRouter);
  app.use('/enumerations', enumerationRouter);
}
