import { BaseService } from '../../../helpers/abstracts/base.service';
import ItemModel, { Item } from '../models/item.model';
import { singleton } from 'tsyringe';
import { ExistsModel } from '../../../helpers/abstracts/exists.model';

@singleton()
export class ItemService extends BaseService<Item> {
  async findOne(id: string): Promise<Item | null> {
    return await ItemModel.findById(id).exec();
  }
  async existByCode(code: string): Promise<ExistsModel | null> {
    return await ItemModel.exists({ code }).exec();
  }
  async existByName(name: string): Promise<ExistsModel | null> {
    return await ItemModel.exists({ name }).exec();
  }
  async findAll({
    page,
    name,
    code,
  }: {
    page?: number;
    name?: string;
    code?: string;
  }): Promise<Item[]> {
    let filters = {};
    let conditions = [];
    name && conditions.push({ name: new RegExp(`${name}`, 'i') });
    code && conditions.push({ code: new RegExp(`${code}`, 'i') });

    conditions.length > 0 && (filters = { ['$or']: conditions, ...filters });
    const query = ItemModel.find(filters, {
      code: 1,
      name: 1,
      description: 1,
      price: 1,
      measurementUnit: 1,
      expirationDate: 1,
    });
    if (page) query.skip(10 * (page - 1)).limit(10);
    const items: Item[] = await query.exec();
    return items;
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
}
