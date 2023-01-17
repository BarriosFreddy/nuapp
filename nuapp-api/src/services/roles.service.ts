import RoleModel, { Role } from '../models/role.model';
import { singleton } from 'tsyringe';

@singleton()
export class RoleService {
  async findOne(id: string) {
    return await RoleModel.findById(id).exec();
  }
  async findAll() {
    const roles = await RoleModel.find().exec();
    return roles;
  }

  async save(role: Role): Promise<Role> {
    try {
      return await RoleModel.create(role);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(id: string, role: Role): Promise<any> {
    try {
      const { modifiedCount } = await RoleModel.updateOne({ _id: id }, role);
      return !!modifiedCount && this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
