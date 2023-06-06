import { getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Supplier extends TimeStamps {
  _id!: mongoose.Types.ObjectId;
  @prop({ required: true, unique: true })
  public nit!: string;
  @prop({ required: true })
  public name?: string;
  @prop()
  public address?: string;
  @prop()
  public email?: string;
  @prop()
  public phoneNumber?: string;
}

const SupplierModel = getModelForClass(Supplier);
export default SupplierModel;
