import { BillService } from '../../services/billing/bill.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Bill } from '../../models/billing/bill.model';

const billsService = container.resolve(BillService);

class BillsController {
  async findAll(_req: Request, res: Response) {
    const bills = await billsService.findAll();
    res.status(200).send(bills);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const bill = await billsService.findOne(id);
    res.status(200).send(bill);
  }

  async save(req: Request, res: Response) {
    const bill: Bill = req.body;
    const savedBill = await billsService.save(bill);
    res.status(201).send(savedBill);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const bill: Bill = req.body;
    const savedBill = await billsService.update(id, bill);
    savedBill
      ? res.status(201).send(savedBill)
      : res.status(400).send('Something went wrong');
  }
}

const billController = new BillsController();
export default billController;
