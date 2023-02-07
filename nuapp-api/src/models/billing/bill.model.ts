import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Item } from './item.model';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Bill extends TimeStamps implements Base {
  @prop()
  id!: string;
  _id!: mongoose.Types.ObjectId;
  @prop({ required: true })
  public code!: string;
  @prop()
  public billAmount?: number;
  @prop({ ref: () => Item })
  public items!: Ref<Item>[];
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const BillModel = getModelForClass(Bill);
export default BillModel;