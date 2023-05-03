import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  options: {
    customName: 'categories',
  },
})
export class Category extends TimeStamps {
  @prop({ required: true })
  public name!: string;
  @prop()
  public description?: string;
}

const CategoryModel = getModelForClass(Category);
export default CategoryModel;
