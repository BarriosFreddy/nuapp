import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Category } from './category.model';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Item extends TimeStamps implements Base {
  @prop()
  id!: string;
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
  @prop({ ref: () => Category })
  public categoryId?: Ref<Category>;
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const ItemModel = getModelForClass(Item);
export default ItemModel;
