import KardexTransactionModel, {
  KardexTransaction,
} from '../../models/billing/kardex-transaction.model';
import { singleton } from 'tsyringe';

@singleton()
export class KardexTransactionService {
  async findOne(id: string) {
    return await KardexTransactionModel.findById(id).exec();
  }
  async findAll(): Promise<KardexTransaction[]> {
    const bills: KardexTransaction[] =
      await KardexTransactionModel.find().exec();
    return bills;
  }
  async save(category: KardexTransaction): Promise<KardexTransaction> {
    try {
      return await KardexTransactionModel.create(category);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(
    id: string,
    category: KardexTransaction,
  ): Promise<KardexTransaction | boolean | null> {
    try {
      const { modifiedCount } = await KardexTransactionModel.updateOne(
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
