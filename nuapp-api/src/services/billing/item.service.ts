import ItemModel, { Item } from '../../models/billing/item.model';
import { singleton } from 'tsyringe';

@singleton()
export class ItemService {
  async findOne(id: string): Promise<Item | null> {
    return await ItemModel.findById(id).exec();
  }
  async findAll(): Promise<Item[]> {
    const items: Item[] = await ItemModel.find().exec();
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
