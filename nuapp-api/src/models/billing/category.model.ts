import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';

@modelOptions({
  options: {
    customName: 'categories',
  },
})
export class Category extends TimeStamps implements Base {
  @prop()
  _id!: mongoose.Types.ObjectId;
  @prop()
  id!: string;
  @prop({ required: true })
  public name!: string;
  @prop()
  public description?: string;
}

const CategoryModel = getModelForClass(Category);
export default CategoryModel;
