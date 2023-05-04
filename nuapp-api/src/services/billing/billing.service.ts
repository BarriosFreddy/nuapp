import BillingModel, { Billing } from '../../models/billing/billing.model';
import { singleton, container } from 'tsyringe';
import { KardexTransactionService } from './kardex-transaction.service';
import { KardexTransaction } from '../../models/billing/kardex-transaction.model';
import { KardexTransactionType } from '../../helpers/enums/kardex-transaction-type';
import { BaseService } from '../../helpers/core/base.service';

const kardexTransactionService = container.resolve(KardexTransactionService);

@singleton()
export class BillingService extends BaseService<Billing> {
  async findOne(id: string): Promise<Billing | null> {
    return await BillingModel.findById(id).exec();
  }
  async findAll(): Promise<Billing[]> {
    const bills: Billing[] = await BillingModel.find().exec();
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

  async update(id: string, billing: Billing): Promise<Billing | null> {
    try {
      billing.updatedAt = new Date();
      await BillingModel.updateOne({ _id: id }, billing);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
