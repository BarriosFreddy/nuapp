import { BaseService } from '../helpers/core/base.service';
import EnumerationModel, { Enumeration } from '../models/enumeration.model';
import { singleton } from 'tsyringe';
import mongoose from 'mongoose';

@singleton()
export class EnumerationService extends BaseService<Enumeration> {
  async findOne(id: string): Promise<Enumeration | null> {
    return await EnumerationModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    }).exec();
  }
  async findAll(): Promise<Enumeration[]> {
    const enumerations = await EnumerationModel.find().exec();
    return enumerations;
  }
  async save(enumeration: Enumeration): Promise<Enumeration> {
    try {
      enumeration.createdAt = new Date();
      return await EnumerationModel.create(enumeration);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(
    id: string,
    enumeration: Enumeration,
  ): Promise<Enumeration | null> {
    try {
      enumeration.updatedAt = new Date();
      await EnumerationModel.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        enumeration,
      );
      return this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
