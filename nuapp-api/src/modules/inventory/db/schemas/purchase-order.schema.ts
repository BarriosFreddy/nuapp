import { Schema, Types } from 'mongoose';
import { PurchaseOrder } from '../../entities/PurchaseOrder';

export const purchaseOrderSchema = new Schema<PurchaseOrder>({
  code: String,
  items: [
    {
      name: String,
      units: Number,
      measurementUnit: String,
      cost: Number,
    },
  ],
  supplierId: Types.ObjectId,
  comments: String,
  createdAt: {
    date: Number,
    offset: Number,
  },
});
