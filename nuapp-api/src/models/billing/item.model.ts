import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Enum } from '../enumeration.model';

export class Item extends TimeStamps {
  _id!: mongoose.Types.ObjectId;
  @prop({ required: true })
  public code!: string;
  @prop({ required: true })
  public name?: string;
  @prop()
  public description?: string;
  @prop()
  public price?: number;
  @prop()
  public units?: number;
  @prop()
  public measurementUnit?: string;
  @prop({ ref: () => Enum })
  public categoryId?: Ref<Enum>;
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const ItemModel = getModelForClass(Item);
export default ItemModel;
