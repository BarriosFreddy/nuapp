import { BaseService } from '../../../helpers/abstracts/base.service';
import ItemModel, { Item } from '../models/item.model';
import { singleton } from 'tsyringe';
import { ExistsModel } from '../../../helpers/abstracts/exists.model';
import { ObjectId } from 'mongoose';
import ItemQueryI from '../models/item-query.interface';
import { QueryStrategy } from './query-strategy';
import { ItemQueryStrategy } from './item-query.strategy';

@singleton()
export class ItemService extends BaseService<Item> {
  async findOne(id: string | ObjectId): Promise<Item | null> {
    return await ItemModel.findById(id).exec();
  }
  async existByCode(code: string): Promise<ExistsModel | null> {
    return await ItemModel.exists({ code }).exec();
  }
  async existByName(name: string): Promise<ExistsModel | null> {
    return await ItemModel.exists({ name }).exec();
  }
  async save(item: Item): Promise<Item> {
    try {
      item.createdAt = new Date();
      return await ItemModel.create(item);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
  async saveAll(items: Item[]): Promise<any> {
    try {
      items.forEach((item) => (item.createdAt = new Date()));
      let itemModels = items.map((item) => new ItemModel(item));
      const result = await ItemModel.bulkSave(itemModels);
      return result;
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(id: string, item: Item): Promise<Item | null> {
    try {
      item.updatedAt = new Date();
      await ItemModel.updateOne({ _id: id }, item);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
  async findAll(itemQuery: ItemQueryI): Promise<Item[]> {
    const strategy: QueryStrategy = new ItemQueryStrategy(itemQuery);
    const items: Item[] = await ItemModel.aggregate(
      strategy.buildAggregate(),
    ).exec();
    return items;
  }
}
