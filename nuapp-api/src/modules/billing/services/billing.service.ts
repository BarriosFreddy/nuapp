import BillingModel, { Billing } from '../models/billing.model';
import { singleton, container } from 'tsyringe';
import { KardexTransactionService } from './kardex-transaction.service';
import { KardexTransactionType } from '../enums/kardex-transaction-type';
import { BaseService } from '../../../helpers/abstracts/base.service';
import { KardexTransaction } from '../models/kardex-transaction.model';

const kardexTransactionService = container.resolve(KardexTransactionService);

@singleton()
export class BillingService extends BaseService<Billing> {
  async findOne(id: string): Promise<Billing | null> {
    return await BillingModel.findById(id).exec();
  }
  async findAll({ page = 1 }): Promise<Billing[]> {
    const bills: Billing[] = await BillingModel.find()
      .skip(10 * (page - 1))
      .limit(10)
      .sort({ createdAt: -1 })
      .exec();
    return bills;
  }
  async save(billing: Billing): Promise<Billing> {
    try {
      billing.createdAt = new Date();
      const saved = await BillingModel.create(billing);
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

  async update(_: string, __: Billing): Promise<Billing | null> {
    throw new Error('Not Supported');
  }
}
