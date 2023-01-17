import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Category } from './category.model';

export class Item {
  @prop()
  id?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
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
  public createdAt?: Date;
  @prop()
  public updatedAt?: Date;
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const ItemModel = getModelForClass(Item);
export default ItemModel;
