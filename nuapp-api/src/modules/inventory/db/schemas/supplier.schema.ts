import { Schema, Types } from "mongoose";

export const supplierSchema = new Schema({
    _id: Types.ObjectId,
    nit: String,
    name: String,
    address: String,
    email: String,
    phoneNumber: String,
  })