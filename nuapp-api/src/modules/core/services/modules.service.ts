import { BaseService } from '../../../helpers/abstracts/base.service';
import { Module } from '../domain/Module';
import ModuleModel from '../models/module.model';
import { singleton } from 'tsyringe';

@singleton()
export class ModuleService extends BaseService<Module> {
  async findOne(id: string): Promise<Module | null> {
    return await ModuleModel.findById(id).exec();
  }
  async findByCode(code: string): Promise<Module | null> {
    return await ModuleModel.findOne({ code }).exec();
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
