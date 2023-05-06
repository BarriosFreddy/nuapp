import { BaseService } from '../../../helpers/abstracts/base.service';
import RoleModel, { Role } from '../models/role.model';
import { singleton } from 'tsyringe';

@singleton()
export class RoleService extends BaseService<Role> {
  
  async findOne(id: string): Promise<Role | null> {
    return await RoleModel.findById(id).exec();
  }
  async findAll(): Promise<Role[]> {
    const roles = await RoleModel.find().exec();
    return roles;
  }

  async save(role: Role): Promise<Role> {
    try {
      role.createdAt = new Date();
      return await RoleModel.create(role);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(id: string, role: Role): Promise<Role | null> {
    try {
      role.updatedAt = new Date();
      await RoleModel.updateOne({ _id: id }, role);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
