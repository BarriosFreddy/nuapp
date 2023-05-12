import { BaseService } from '../../../helpers/abstracts/base.service';
import CategoryModel, { Category } from '../models/category.model';
import { singleton } from 'tsyringe';

@singleton()
export class CategoryService extends BaseService<Category> {
  async findOne(id: string): Promise<Category | null> {
    return await CategoryModel.findById(id).exec();
  }
  async findAll({
    page = 1,
    name,
    code,
  }: {
    page: number;
    name?: string;
    code?: string;
  }): Promise<Category[]> {
    let filters = {};
    let conditions = [];
    name && conditions.push({ name: new RegExp(`${name}`, 'i') });
    code && conditions.push({ code: new RegExp(`${code}`, 'i') });

    conditions.length > 0 && (filters = { ['$or']: conditions, ...filters });

    const categories = await CategoryModel.find(filters)
      .skip(10 * (page - 1))
      .limit(10)
      .exec();
    return categories;
  }
  async save(category: Category): Promise<Category> {
    try {
      category.createdAt = new Date();
      return await CategoryModel.create(category);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(id: string, category: Category): Promise<Category | null> {
    try {
      category.updatedAt = new Date();
      await CategoryModel.updateOne({ _id: id }, category);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
