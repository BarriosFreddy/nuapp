import ModuleModel, { Module } from '../models/module.model';
import { singleton } from 'tsyringe';

@singleton()
export class RoleService {
  async findOne(id: string) {
    return await ModuleModel.findById(id).exec();
  }
  async findAll() {
    const modules = await ModuleModel.find().exec();
    return modules;
  }

  async save(modules: Module): Promise<Module> {
    try {
      return await ModuleModel.create(modules);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(id: string, modules: Module): Promise<any> {
    try {
      const { modifiedCount } = await ModuleModel.updateOne({ _id: id }, modules);
      return !!modifiedCount && this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
