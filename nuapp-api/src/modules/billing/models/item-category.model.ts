import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';

@modelOptions({
  options: {
    customName: 'item-categories',
  },
})
export class ItemCategory extends TimeStamps {
  _id!: mongoose.Types.ObjectId;
  @prop({ required: true, unique: true })
  public code!: string;
  @prop({ required: true })
  public name!: string;
  @prop()
  public description?: string;
}

const ItemCategoryModel = getModelForClass(ItemCategory);
export default ItemCategoryModel;
