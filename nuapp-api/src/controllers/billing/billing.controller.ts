import { BillingService } from '../../services/billing/billing.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Billing } from '../../models/billing/billing.model';

const billingService = container.resolve(BillingService);

class BillingController {
  async findAll(_req: Request, res: Response) {
    const bills = await billingService.findAll();
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

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const billing: Billing = req.body;
    const savedBill = await billingService.update(id, billing);
    savedBill
      ? res.status(201).send(savedBill)
      : res.status(400).send('Something went wrong');
  }
}

const billingController = new BillingController();
export default billingController;
