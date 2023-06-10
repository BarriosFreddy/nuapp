import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Item } from './item.model';
import { DateObject } from '../../../helpers/abstracts/timestamps.abstract';

@modelOptions({
  options: {
    customName: 'kardex-transactions',
  },
})
export class KardexTransaction {
  _id?: mongoose.Types.ObjectId;
  @prop()
  public type!: string;
  @prop({ ref: () => Item })
  public itemId!: Ref<Item>;
  @prop()
  public code!: string;
  @prop()
  public units!: number;
  @prop()
  public computed: boolean = false;
  @prop()
  public createdBy?: mongoose.Types.ObjectId;
  @prop()
  public createdAt?: DateObject;
}

const KardexTransactionModel = getModelForClass(KardexTransaction);
export default KardexTransactionModel;
