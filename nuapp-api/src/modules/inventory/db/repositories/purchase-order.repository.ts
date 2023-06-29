import { PurchaseOrder } from '../../entities/PurchaseOrder';
import { IRepository } from './IRepository';
import PurchaseOrderModel from '../models/purchase-order.model';

export class PurchaseOrderRepository implements IRepository<PurchaseOrder> {
  public async findAll(query: {
    page: string | number;
  }): Promise<PurchaseOrder[]> {
    return await PurchaseOrderModel.find({})
      .skip(10 * (+query.page - 1))
      .limit(10);
  }
  public async save(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder> {
    return await PurchaseOrderModel.create(purchaseOrder);
  }
}
