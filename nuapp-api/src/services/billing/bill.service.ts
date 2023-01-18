import BillModel, { Bill } from '../../models/billing/bill.model';
import { singleton, container } from 'tsyringe';
import { KardexTransactionService } from './kardex-transaction.service';
import { KardexTransaction } from '../../models/billing/kardex-transaction.model';
import { KardexTransactionType } from '../../helpers/enums/kardex-transaction-type';

const kardexTransactionService = container.resolve(KardexTransactionService);

@singleton()
export class BillService {
  async findOne(id: string): Promise<Bill | null> {
    return await BillModel.findById(id).exec();
  }
  async findAll(): Promise<Bill[]> {
    const bills: Bill[] = await BillModel.find().exec();
    return bills;
  }
  async save(bill: Bill): Promise<Bill> {
    try {
      bill.createdAt = new Date();
      const saved = await BillModel.create(bill);
      const { items } = saved;
      for await (const item of items) {
        const kardexTransaction: KardexTransaction = {
          code: new Date().getMilliseconds().toString(),
          type: KardexTransactionType.OUT,
          itemId: item._id,
          units: 1,
        };
        await kardexTransactionService.save(kardexTransaction);
      }
      return saved;
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(id: string, bill: Bill): Promise<Bill | null> {
    try {
      bill.updatedAt = new Date();
      await BillModel.updateOne({ _id: id }, bill);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
