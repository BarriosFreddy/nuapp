import { Schema, Types } from 'mongoose';

export const itemSchema = new Schema({
  code: String,
  name: String,
  description: String,
  price: Number,
  cost: Number,
  stock: Number,
  reorderPoint: Number, // lowest point to alert and reorder it
  measurementUnit: String,
  lot: String,
  expirationDate: String,
  laboratory: String,
  categoryId: Types.ObjectId,
  supplierId: Types.ObjectId,
  modifiedBy: Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
