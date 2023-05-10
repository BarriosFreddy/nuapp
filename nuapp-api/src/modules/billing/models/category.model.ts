import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';

@modelOptions({
  options: {
    customName: 'categories',
  },
})
export class Category extends TimeStamps {
  _id!: mongoose.Types.ObjectId;
  @prop({ required: true })
  public code!: string;
  @prop({ required: true })
  public name!: string;
  @prop()
  public description?: string;
}

const CategoryModel = getModelForClass(Category);
export default CategoryModel;
