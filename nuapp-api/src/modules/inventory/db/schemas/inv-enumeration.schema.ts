import { Schema, Types } from 'mongoose';

export const invEnumerationSchema = new Schema({
  _id: Types.ObjectId,
  code: String,
  name: String,
  description: String,
  values: [
    {
      _id: Types.ObjectId,
      label: String,
      code: String,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});
