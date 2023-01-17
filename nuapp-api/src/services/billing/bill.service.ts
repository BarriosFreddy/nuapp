import BillModel, { Bill } from '../../models/billing/bill.model';
import { singleton, container } from 'tsyringe';
import { KardexTransactionService } from './kardex-transaction.service';
import { KardexTransaction } from '../../models/billing/kardex-transaction.model';

const kardexTransactionService = container.resolve(KardexTransactionService);

@singleton()
export class BillService {
  async findOne(id: string) {
    return await BillModel.findById(id).exec();
  }
  async findAll(): Promise<Bill[]> {
    const bills: Bill[] = await BillModel.find().exec();
    return bills;
  }
  async save(category: Bill): Promise<Bill> {
    try {
      const saved = await BillModel.create(category);
      const { items } = saved;
      for await (const item of items) {
        const kardexTransaction: KardexTransaction = {
          code: new Date().getMilliseconds().toString(),
          type: 'OUT',
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

  async update(id: string, category: Bill): Promise<Bill | boolean | null> {
    try {
      const { modifiedCount } = await BillModel.updateOne(
        { _id: id },
        category,
      );
      return !!modifiedCount && this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
