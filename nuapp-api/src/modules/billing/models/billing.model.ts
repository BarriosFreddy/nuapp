import { getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Item } from './item.model';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Billing extends TimeStamps {
  _id!: mongoose.Types.ObjectId;
  @prop({ required: true, unique: true })
  public code!: string;
  @prop()
  public billAmount?: number;
  @prop()
  public receivedAmount?: number;
  @prop({ ref: () => Item })
  public items!: Item[];
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const BillingModel = getModelForClass(Billing);
export default BillingModel;
