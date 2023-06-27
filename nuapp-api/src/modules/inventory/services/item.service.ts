import { BaseService } from '../../../helpers/abstracts/base.service';
import ItemModel from '../db/models/item.model';
import { singleton } from 'tsyringe';
import { ObjectId } from 'mongoose';
import ItemQueryI from '../db/models/item-query.interface';
import { QueryStrategy } from './query-strategy';
import { ItemQueryStrategy } from './item-query.strategy';
import { Item } from '../entities/Item';

@singleton()
export class ItemService extends BaseService<Item> {
  async findOne(id: string | ObjectId): Promise<Item | null> {
    const item = await ItemModel.findById(id).exec();
    return item ? Item.of(item) : null;
  }
  async existByCode(code: string): Promise<any | null> {
    return await ItemModel.exists({ code }).exec();
  }
  async existByName(name: string): Promise<any | null> {
    return await ItemModel.exists({ name }).exec();
  }
  async save(item: Item): Promise<Item> {
    try {
      item.createdAt = new Date();
      return Item.of(await ItemModel.create(item));
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
