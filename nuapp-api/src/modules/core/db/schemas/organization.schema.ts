import { Schema, Types } from 'mongoose';

export const organizationSchema = new Schema({
  name: String,
  nit: String,
  logoLink: String,
  createdAt: {
    date: Number,
    offset: Number,
  },
  updatedAt: {
    date: Number,
    offset: Number,
  },
  modifiedBy: Types.ObjectId,
});
