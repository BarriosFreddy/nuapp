import { BaseService } from '../../../helpers/abstracts/base.service';
import { Organization } from '../entities/Organization';
import { singleton } from 'tsyringe';
import { organizationSchema } from '../db/schemas/organization.schema';
import { OrganizationStatus } from '../entities/enums/organization-status';

@singleton()
export class OrganizationService extends BaseService<Organization> {
  getModelName = () => 'Organization';
  getSchema = () => organizationSchema;
  getCollectionName = () => undefined;

  async findOne(id: string): Promise<Organization | null> {
    return await this.getModel().findById(id).exec();
  }
  async findAll(): Promise<Organization[]> {
    const organizations = await this.getModel().find().exec();
    return organizations;
  }
  async save(organization: Organization): Promise<Organization> {
    try {
      organization.status = OrganizationStatus.CREATING;
      return await this.getModel().create(organization);
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
      await this.getModel().updateOne({ _id: id }, organization);
      return this.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
