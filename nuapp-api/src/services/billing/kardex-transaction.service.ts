import KardexTransactionModel, {
  KardexTransaction,
} from '../../models/billing/kardex-transaction.model';
import { singleton } from 'tsyringe';

@singleton()
export class KardexTransactionService {
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
      kardexTransaction.createdAt = new Date();
      return await KardexTransactionModel.create(kardexTransaction);
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
      kardexTransaction.updatedAt = new Date();
      await KardexTransactionModel.updateOne({ _id: id }, kardexTransaction);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
