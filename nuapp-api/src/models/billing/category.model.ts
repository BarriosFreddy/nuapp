import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

@modelOptions({
  options: {
    customName: 'categories',
  },
})
export class Category {
  @prop()
  id?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
  @prop({ required: true })
  public name!: string;
  @prop()
  public description?: string;
  @prop()
  public createdAt?: Date;
  @prop()
  public updatedAt?: Date;
}

const CategoryModel = getModelForClass(Category);
export default CategoryModel;
