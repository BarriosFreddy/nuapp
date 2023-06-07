import { getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Item extends TimeStamps {
  _id!: mongoose.Types.ObjectId;
  @prop({ required: true, unique: true })
  public code!: string;
  @prop({ required: true })
  public name!: string;
  @prop()
  public description?: string;
  @prop()
  public price!: number;
  @prop()
  public units!: number;
  @prop()
  public measurementUnit?: string;
  @prop()
  public lot?: string;
  @prop()
  public expirationDate?: string;
  @prop()
  public laboratory?: string;
}

const ItemModel = getModelForClass(Item);
export default ItemModel;
