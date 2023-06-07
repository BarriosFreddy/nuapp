import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ItemCategory } from './item-category.model';
import { Supplier } from './supplier.model';

export class Item extends TimeStamps {
  _id?: mongoose.Types.ObjectId;
  @prop({ required: true, unique: true })
  public code!: string;
  @prop({ required: true })
  public name!: string;
  @prop()
  public description?: string;
  @prop()
  public price!: number;
  @prop()
  public cost!: number;
  @prop()
  public stock!: number;
  @prop()
  public reorderPoint?: number; // lowest point to alert and reorder it
  @prop()
  public measurementUnit?: string;
  @prop()
  public lot?: string;
  @prop()
  public expirationDate?: string;
  @prop()
  public laboratory?: string;
  @prop({ ref: () => ItemCategory })
  public categoryId?: Ref<ItemCategory>;
  @prop({ ref: () => Supplier })
  public supplierId?: Ref<Supplier>;
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const ItemModel = getModelForClass(Item);
export default ItemModel;
