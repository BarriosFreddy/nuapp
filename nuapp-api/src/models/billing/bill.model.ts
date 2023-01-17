import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Item } from './item.model';

export class Bill {
  @prop()
  id?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
  @prop({ required: true })
  public code!: string;
  @prop()
  public billAmount?: number;
  @prop()
  public createdAt?: Date;
  @prop({ ref: () => Item })
  public items!: Ref<Item>[];
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const BillModel = getModelForClass(Bill);
export default BillModel;
