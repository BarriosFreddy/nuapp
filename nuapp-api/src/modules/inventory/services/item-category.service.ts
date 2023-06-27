import { BaseService } from '../../../helpers/abstracts/base.service';
import { singleton } from 'tsyringe';
import { ItemCategory } from '../entities/ItemCategory';
import ItemCategoryModel from '../db/models/item-category.model';

@singleton()
export class ItemCategoryService extends BaseService<ItemCategory> {
  async findOne(id: string): Promise<ItemCategory | null> {
    return await ItemCategoryModel.findById(id).exec();
  }
  async existByCode(code: string): Promise<any | null> {
    return await ItemCategoryModel.exists({ code }).exec();
  }
  async existByName(name: string): Promise<any | null> {
    return await ItemCategoryModel.exists({ name }).exec();
  }
  async findAll({
    page = 1,
    name,
    code,
  }: {
    page: number;
    name?: string;
    code?: string;
  }): Promise<ItemCategory[]> {
    let filters = {};
    let conditions = [];
    name && conditions.push({ name: new RegExp(`${name}`, 'i') });
    code && conditions.push({ code: new RegExp(`${code}`, 'i') });

    conditions.length > 0 && (filters = { ['$or']: conditions, ...filters });

    const categories = await ItemCategoryModel.find(filters)
      .skip(10 * (page - 1))
      .limit(10)
      .exec();
    return categories;
  }
  async save(itemCategory: ItemCategory): Promise<ItemCategory> {
    try {
      itemCategory.createdAt = new Date();
      return await ItemCategoryModel.create(itemCategory);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(
    id: string,
    itemCategory: ItemCategory,
  ): Promise<ItemCategory | null> {
    try {
      itemCategory.updatedAt = new Date();
      await ItemCategoryModel.updateOne({ _id: id }, itemCategory);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
