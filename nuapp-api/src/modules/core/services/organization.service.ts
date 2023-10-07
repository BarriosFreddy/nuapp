import { BaseService } from '../../../helpers/abstracts/base.service';
import { Organization } from '../entities/Organization';
import OrganizationModel from '../db/models/organization.model';
import { singleton } from 'tsyringe';

@singleton()
export class OrganizationService extends BaseService<Organization> {
  async findOne(id: string): Promise<Organization | null> {
    return await OrganizationModel.findById(id).exec();
  }
  async findAll(): Promise<Organization[]> {
    const organizations = await OrganizationModel.find().exec();
    return organizations;
  }
  async save(organization: Organization): Promise<Organization> {
    try {
      return await OrganizationModel.create(organization);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
  async update(
    id: string,
    organization: Organization,
  ): Promise<Organization | null> {
    try {
      await OrganizationModel.updateOne({ _id: id }, organization);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
