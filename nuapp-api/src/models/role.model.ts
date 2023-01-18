import { getModelForClass, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';

class ModuleAccess {
  @prop()
  public moduleId?: mongoose.Types.ObjectId;
  @prop()
  public canSee?: boolean;
  @prop()
  public canCreate?: boolean;
  @prop()
  public canUpdate?: boolean;
  @prop()
  public canDelete?: boolean;
  @prop()
  public canExecute?: boolean;
}

export class Role extends TimeStamps implements Base {
  @prop()
  id!: string;
  _id!: mongoose.Types.ObjectId;
  @prop()
  public name?: string;
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
  @prop({ type: () => [ModuleAccess] })
  public modulesAccess?: ModuleAccess[];
}

const RoleModel = getModelForClass(Role);
export default RoleModel;
