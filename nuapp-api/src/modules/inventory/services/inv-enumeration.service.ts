import { singleton } from 'tsyringe';
import { InvEnumerationRepository } from '../db/repositories/inv-enumeration.repository';
import { InvEnumeration } from '../entities/InvEnumeration';

@singleton()
export class InvEnumerationService {
  constructor(private invEnumerationRepository: InvEnumerationRepository) {}

  async save(invEnumeration: InvEnumeration): Promise<InvEnumeration> {
    try {
      return this.invEnumerationRepository.save(invEnumeration);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(
    id: string,
    invEnumeration: InvEnumeration,
  ): Promise<InvEnumeration | null> {
    try {
      await this.invEnumerationRepository.update(id, invEnumeration);
      return this.invEnumerationRepository.findOne(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  findAll(query: { page: string | number }): Promise<InvEnumeration[]> {
    try {
      return this.invEnumerationRepository.findAll(query);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  findByCode(code: string): Promise<InvEnumeration | null> {
    try {
      return this.invEnumerationRepository.findByCode(code);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
