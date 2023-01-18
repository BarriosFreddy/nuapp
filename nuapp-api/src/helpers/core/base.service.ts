export abstract class BaseService<T> {
  abstract findOne(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract save(role: T): Promise<T>;
  abstract update(id: string, role: T): Promise<T | null>;
}
