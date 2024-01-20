import { Schema, Types } from 'mongoose';

export const billingSchema = new Schema({
  code: String,
  billAmount: Number,
  receivedAmount: Number,
  creationDate: String,
  clientId: Types.ObjectId,
  items: [
    {
      _id: Types.ObjectId,
      code: String,
      name: String,
      description: String,
      price: Number,
      units: Number,
      measurementUnit: String,
      multiplicity: Number,
      lot: String,
      expirationDate: String,
      laboratory: String,
    },
  ],
  modifiedBy: Types.ObjectId,
  createdAt: {
    date: Number,
    offset: Number,
  },
});
