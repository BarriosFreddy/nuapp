import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';

export class Enum {
  _id!: mongoose.Types.ObjectId;
  @prop()
  label?: string;
  @prop()
  code?: string;
}

@modelOptions({
  options: {
    customName: 'enumerations',
  },
})
export class Enumeration extends TimeStamps {
  _id!: mongoose.Types.ObjectId;
  @prop({ required: true })
  public name!: string;
  @prop()
  public description?: string;
  @prop({ type: () => [Enum] })
  public values?: Enum[];
}

const EnumerationModel = getModelForClass(Enumeration);
export default EnumerationModel;
