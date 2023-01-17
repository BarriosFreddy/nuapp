import CategoryModel, { Category } from '../../models/billing/category.model';
import { singleton } from 'tsyringe';

@singleton()
export class CategoryService {
  async findOne(id: string) {
    return await CategoryModel.findById(id).exec();
  }
  async findAll() {
    const categories = await CategoryModel.find().exec();
    return categories;
  }
  async save(category: Category): Promise<Category> {
    try {
      return await CategoryModel.create(category);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(id: string, category: Category): Promise<any> {
    try {
      const { modifiedCount } = await CategoryModel.updateOne(
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
