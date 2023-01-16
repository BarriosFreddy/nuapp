import { getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export class Module {
  @prop()
  id?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
  @prop()
  public name?: string;
  @prop()
  public uri?: string;
  @prop()
  public icon?: string;
  @prop()
  public createdAt?: Date;
  @prop()
  public updatedAt?: Date;
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const ModuleModel = getModelForClass(Module);
export default ModuleModel;
