import { getModelForClass, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';

class ModuleAccess {
  @prop()
  public roleCode!: string;
  @prop()
  public canAccess!: boolean;
  @prop()
  public canCreate!: boolean;
  @prop()
  public canUpdate!: boolean;
  @prop()
  public canDelete!: boolean;
  @prop()
  public canExecute!: boolean;
}

export class Module extends TimeStamps implements Base {
  @prop()
  id!: string;
  _id!: mongoose.Types.ObjectId;
  @prop()
  public name!: string;
  @prop()
  public code!: string;
  @prop()
  public uri?: string;
  @prop()
  public icon?: string;
  @prop({ type: () => ModuleAccess })
  public access?: ModuleAccess[];
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const ModuleModel = getModelForClass(Module);
export default ModuleModel;
