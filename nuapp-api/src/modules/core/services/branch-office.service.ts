import { BaseService } from '../../../helpers/abstracts/base.service';
import BranchOfficeModel from '../db/models/branch-office.model';
import { BranchOffice } from '../entities/BranchOffice';
import { singleton } from 'tsyringe';

@singleton()
export class BranchOfficeService extends BaseService<BranchOffice> {
  async findOne(id: string): Promise<BranchOffice | null> {
    return await BranchOfficeModel.findById(id).exec();
  }
  async findAll(): Promise<BranchOffice[]> {
    const branches = await BranchOfficeModel.find().exec();
    return branches;
  }
  async save(branchOffice: BranchOffice): Promise<BranchOffice> {
    try {
      return await BranchOfficeModel.create(branchOffice);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
  async update(
    id: string,
    branchOffice: BranchOffice,
  ): Promise<BranchOffice | null> {
    try {
      await BranchOfficeModel.updateOne({ _id: id }, branchOffice);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
