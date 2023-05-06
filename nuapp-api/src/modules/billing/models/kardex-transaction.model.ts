import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Item } from './item.model';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  options: {
    customName: 'kardex-transactions',
  },
})
export class KardexTransaction extends TimeStamps{
  _id?: mongoose.Types.ObjectId;
  @prop({ required: true })
  public code!: string;
  @prop()
  public type!: string;
  @prop({ ref: () => Item })
  public itemId!: Ref<Item>;
  @prop()
  public units!: number;
  @prop()
  public createdBy?: mongoose.Types.ObjectId;
}

const KardexTransactionModel = getModelForClass(KardexTransaction);
export default KardexTransactionModel;
