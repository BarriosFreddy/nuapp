import ItemModel, { Item } from '../../models/billing/item.model';
import { singleton } from 'tsyringe';

@singleton()
export class ItemService {
  async findOne(id: string) {
    return await ItemModel.findById(id).exec();
  }
  async findAll(): Promise<Item[]> {
    const items: Item[] = await ItemModel.find().exec();
    return items;
  }
  async save(category: Item): Promise<Item> {
    try {
      return await ItemModel.create(category);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(id: string, category: Item): Promise<Item | boolean | null> {
    try {
      const { modifiedCount } = await ItemModel.updateOne(
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
