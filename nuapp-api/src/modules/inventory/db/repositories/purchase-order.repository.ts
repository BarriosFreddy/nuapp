import { PurchaseOrder } from "../../entities/PurchaseOrder";
import { IRepository } from "./IRepository";
import PurchaseOrderModel from '../models/purchase-order.model';

export class PurchaseOrderRepository implements IRepository<PurchaseOrder> {
  public async save(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder> {
    return await PurchaseOrderModel.create(purchaseOrder);
  }
}
