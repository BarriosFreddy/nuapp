import { BaseService } from '../../../helpers/abstracts/base.service';
import KardexTransactionModel, {
  KardexTransaction,
} from '../models/kardex-transaction.model';
import { singleton, container } from 'tsyringe';
import { ItemService } from './item.service';
import { KardexTransactionType } from '../enums/kardex-transaction-type';

const itemService = container.resolve(ItemService);

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

      setImmediate(async () => {
        await this.applyKardexMovements(kardexTransactions);
      });

      return result;
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async applyKardexMovements(kardexTransactions: KardexTransaction[]) {
    try {
      for await (const kardex of kardexTransactions) {
        const { itemId, units, type, itemCost, itemPrice } = kardex;
        const item = await itemService.findOne(itemId.toString());
        if (!item || units <= 0) continue;
        if (type === KardexTransactionType.IN) item.addStock(units);
        else if (type === KardexTransactionType.OUT) item.removeStock(units);
        if (!!itemCost) item.cost = itemCost;
        if (!!itemPrice) item.price = itemPrice;
        await itemService.update(itemId.toString(), item);
      }
    } catch (error) {
      console.error(error);
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
