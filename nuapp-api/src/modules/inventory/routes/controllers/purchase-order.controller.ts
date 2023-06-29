import { Request, Response } from 'express';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { PurchaseOrder } from '../../entities/PurchaseOrder';
import { container, singleton } from 'tsyringe';
const purchaseOrderService = container.resolve(PurchaseOrderService);

@singleton()
export default class PurchaseOrderController {
  constructor() {}

  async save(req: Request, res: Response) {
    try {
      const purchaseOrder: PurchaseOrder = req.body;
      const purchaseOrderSaved = await purchaseOrderService.save(purchaseOrder);
      res.status(201).send(purchaseOrderSaved);
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const { page = 1 } = req.params;
      const purchaseOrders = await purchaseOrderService.findAll({ page });
      res.status(200).send(purchaseOrders);
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }
}
