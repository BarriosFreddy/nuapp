import {
  getModelForClass,
  prop,
  Severity,
  modelOptions,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { TimeStamps } from '../../../helpers/abstracts/timestamps.abstract';
import { Item } from './item.model';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Billing extends TimeStamps {
  _id!: mongoose.Types.ObjectId;
  @prop({ required: true, unique: true })
  public code!: string;
  @prop()
  public billAmount?: number;
  @prop()
  public receivedAmount?: number;
  @prop()
  public items!: Item[];
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const BillingModel = getModelForClass(Billing);
export default BillingModel;
