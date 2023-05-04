import { BaseService } from '../../helpers/core/base.service';
import ItemModel, { Item } from '../../models/billing/item.model';
import { singleton } from 'tsyringe';

@singleton()
export class ItemService extends BaseService<Item> {
  async findOne(id: string): Promise<Item | null> {
    return await ItemModel.findById(id).exec();
  }
  async findAll({
    page = 1,
    name,
    code,
  }: {
    page: number;
    name?: string;
    code?: string;
  }): Promise<Item[]> {
    let filters = {};
    let conditions = [];
    name && conditions.push({ name: new RegExp(`${name}`, 'i') });
    code && conditions.push({ code: new RegExp(`${code}`, 'i') });

    conditions.length > 0 && (filters = { ['$or']: conditions, ...filters });
    const items: Item[] = await ItemModel.find(filters)
      .skip(10 * (page - 1))
      .limit(10)
      .exec();
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
