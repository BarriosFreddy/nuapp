import ModuleModel, { Module } from '../models/module.model';
import { singleton } from 'tsyringe';

@singleton()
export class RoleService {
  async findOne(id: string): Promise<Module | null> {
    return await ModuleModel.findById(id).exec();
  }
  async findAll(): Promise<Module[]> {
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

  async update(id: string, modules: Module): Promise<Module | null> {
    try {
      await ModuleModel.updateOne({ _id: id }, modules);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
