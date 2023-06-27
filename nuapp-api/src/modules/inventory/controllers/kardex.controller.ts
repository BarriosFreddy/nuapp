import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { KardexTransactionService } from '../services/kardex-transaction.service';
import { KardexTransaction } from '../entities/kardex-transaction';

const kardexTransactionService = container.resolve(KardexTransactionService);

class KardexTransactionsController {
  async saveAll(req: Request, res: Response) {
    const kardexTransactions: KardexTransaction[] = req.body;
    const result = await kardexTransactionService.saveAll(kardexTransactions);
    res.status(201).send(result);
  }
}

const kardexTransactionsController = new KardexTransactionsController();
export default kardexTransactionsController;
