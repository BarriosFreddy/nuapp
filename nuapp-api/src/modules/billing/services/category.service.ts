import { BaseService } from '../../../helpers/abstracts/base.service';
import CategoryModel, { Category } from '../models/category.model';
import { singleton } from 'tsyringe';

@singleton()
export class CategoryService extends BaseService<Category>{
  async findOne(id: string): Promise<Category | null> {
    return await CategoryModel.findById(id).exec();
  }
  async findAll(): Promise<Category[]> {
    const categories = await CategoryModel.find().exec();
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
