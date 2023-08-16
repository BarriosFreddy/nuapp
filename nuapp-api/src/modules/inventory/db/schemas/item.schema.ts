import { Schema, Types } from 'mongoose';

export const itemSchema = new Schema({
  code: String,
  name: String,
  description: String,
  stock: Number,
  reorderPoint: Number, // lowest point to alert and reorder it
  lot: String,
  expirationDate: String,
  laboratory: String,
  pricesRatio: [
    {
      _id: Types.ObjectId,
      measurementUnit: String,
      price: Number,
      cost: Number,
      hash: String,
      main: String,
      multiplicity: Number,
      organizationId: String,
    },
  ],
  categoryId: Types.ObjectId,
  supplierId: Types.ObjectId,
  modifiedBy: Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
