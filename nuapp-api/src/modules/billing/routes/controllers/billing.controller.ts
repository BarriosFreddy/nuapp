import { BillingService } from '../../services/billing.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Billing } from '../../entities/Billing';
import { setTenantIdToService } from '../../../../helpers/util';

const billingService = container.resolve(BillingService);

class BillingController {
  async findAll(req: Request, res: Response) {
    let { page = 1 } = req.query;
    page = +page;
    const bills = await setTenantIdToService(res, billingService).findAll({
      page,
    });
    res.status(200).send(bills);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const billing = await setTenantIdToService(res, billingService).findOne(id);
    res.status(200).send(billing);
  }
  async findGreaterThanDate(req: Request, res: Response) {
    const { date } = req.params;
    const billings = await setTenantIdToService(
      res,
      billingService,
    ).findGreaterThanDate(date);
    res.status(200).send(billings);
  }

  async save(req: Request, res: Response) {
    const billing: Billing = req.body;
    const savedBill = await setTenantIdToService(res, billingService).save(
      billing,
    );
    res.status(201).send(savedBill);
  }

  async saveAll(req: Request, res: Response) {
    const billings: Billing[] = req.body;
    const result = await setTenantIdToService(res, billingService).saveAll(
      billings,
    );
    res.status(201).send(result);
  }
}

const billingController = new BillingController();
export default billingController;
