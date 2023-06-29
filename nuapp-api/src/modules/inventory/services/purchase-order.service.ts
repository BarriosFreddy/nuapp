import { singleton } from 'tsyringe';
import { PurchaseOrder } from '../entities/PurchaseOrder';
import { PurchaseOrderRepository } from '../db/repositories/purchase-order.repository';

@singleton()
export class PurchaseOrderService {
  constructor(private purchaseOrderRepository: PurchaseOrderRepository) {}

  async save(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder> {
    try {
      return this.purchaseOrderRepository.save(purchaseOrder);
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }
}
