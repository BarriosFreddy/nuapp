import { BaseService } from '../../../helpers/abstracts/base.service';
import KardexTransactionModel, {
  KardexTransaction,
} from '../models/kardex-transaction.model';
import { singleton } from 'tsyringe';

@singleton()
export class KardexTransactionService extends BaseService<KardexTransaction> {
  async findOne(id: string): Promise<KardexTransaction | null> {
    return await KardexTransactionModel.findById(id).exec();
  }
  async findAll(): Promise<KardexTransaction[]> {
    const bills: KardexTransaction[] =
      await KardexTransactionModel.find().exec();
    return bills;
  }
  async save(kardexTransaction: KardexTransaction): Promise<KardexTransaction> {
    try {
      return await KardexTransactionModel.create(kardexTransaction);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async saveAll(kardexTransactions: KardexTransaction[]): Promise<any> {
    try {
      let kardexTransactionModels = kardexTransactions.map(
        (kardex) => new KardexTransactionModel(kardex),
      );
      const result = await KardexTransactionModel.bulkSave(
        kardexTransactionModels,
      );
      return result;
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(
    id: string,
    kardexTransaction: KardexTransaction,
  ): Promise<KardexTransaction | null> {
    try {
      await KardexTransactionModel.updateOne({ _id: id }, kardexTransaction);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
