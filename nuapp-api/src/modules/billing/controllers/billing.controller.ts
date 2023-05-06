import { BillingService } from '../services/billing.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Billing } from '../models/billing.model';

const billingService = container.resolve(BillingService);

class BillingController {
  async findAll(req: Request, res: Response) {
    let { page = 1 } = req.query;
    page = +page;
    const bills = await billingService.findAll({ page });
    res.status(200).send(bills);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const billing = await billingService.findOne(id);
    res.status(200).send(billing);
  }

  async save(req: Request, res: Response) {
    const billing: Billing = req.body;
    const savedBill = await billingService.save(billing);
    res.status(201).send(savedBill);
  }
}

const billingController = new BillingController();
export default billingController;
