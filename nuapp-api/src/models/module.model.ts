import { getModelForClass, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';

export class Module extends TimeStamps implements Base {
  @prop()
  id!: string;
  _id!: mongoose.Types.ObjectId;
  @prop()
  public name?: string;
  @prop()
  public uri?: string;
  @prop()
  public icon?: string;
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const ModuleModel = getModelForClass(Module);
export default ModuleModel;
